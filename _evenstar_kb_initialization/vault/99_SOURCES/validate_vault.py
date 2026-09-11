"""Read-only static consistency audit for the Evenstar knowledge base (Python 3)."""
from pathlib import Path
import sys, re, json, hashlib, collections

root = Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[1]
manifest=json.loads((root/'99_SOURCES/source_manifest.json').read_text(encoding='utf-8'))
originals={'99_SOURCES/'+m['filename'] for m in manifest}
files={p.relative_to(root).as_posix():p for p in root.rglob('*.md') if '.obsidian' not in p.parts}
texts={r:p.read_text(encoding='utf-8-sig') for r,p in files.items()}
errors=[]
stems=collections.defaultdict(list)
for r in files: stems[Path(r).stem.casefold()].append(r)
for s,rs in stems.items():
    if len(rs)>1: errors.append({'duplicate_filename':rs})
metadata={}
ids={}
aliasowners={}
for r,c in texts.items():
    if r in originals: continue
    match=re.match(r'\A---\n(.*?)\n---\n',c,re.S)
    if not match:
        errors.append({'missing_frontmatter':r}); continue
    meta={}
    for line in match[1].splitlines():
        key,_,value=line.partition(': ')
        try: meta[key]=json.loads(value)
        except Exception: errors.append({'invalid_metadata':r,'line':line})
    metadata[r]=meta
    for key in ['type','status','created','updated','systems','aliases','tags','sources']:
        if key not in meta: errors.append({'missing_property':r,'key':key})
    for a in meta.get('aliases',[]):
        if a.casefold() in aliasowners and aliasowners[a.casefold()]!=r: errors.append({'ambiguous_alias':a})
        aliasowners[a.casefold()]=r
    if 'id' in meta:
        if meta['id'] in ids: errors.append({'duplicate_id':meta['id']})
        ids[meta['id']]=r
    if meta.get('type')=='requirement':
        if not re.fullmatch(r'(EV|PBS|PSS|PMS|INT)-REQ-\d{3}',meta.get('id','')): errors.append({'invalid_requirement_id':r})
        if meta.get('status') not in ['accepted','proposed']: errors.append({'requirement_status':r})
        if meta.get('implementation_status')!='unverified': errors.append({'unsubstantiated_requirement_implementation':r})
        if '## Acceptance criteria' not in c or not meta.get('sources'): errors.append({'requirement_traceability':r})
    if meta.get('type')=='adr':
        for heading in ['Context','Decision','Consequences','Alternatives','Related requirements','Related notes','Source']:
            if f'## {heading}' not in c: errors.append({'adr_missing_section':r,'heading':heading})
        if meta.get('date') is not None: errors.append({'unverified_decision_date':r})
    if meta.get('type') in ['concept','principle','workflow','proposed-design','adr','historical-adr','requirement'] and not meta.get('sources'):
        errors.append({'missing_concept_sources':r})

def resolve(target):
    target=target.removesuffix('.md')
    full=target+'.md'
    if full in files: return full
    hits=stems.get(target.casefold(),[])
    if len(hits)==1:return hits[0]
    return aliasowners.get(target.casefold())

headings={r:set(re.findall(r'^#{1,6} (.+?)\s*$',c,re.M)) for r,c in texts.items()}
graph=collections.defaultdict(set)
source_links=collections.defaultdict(set)
link_count=0
for r,c in texts.items():
    # Frontmatter sources are valid Obsidian property links too, but graph is body-only.
    body=re.sub(r'\A---\n.*?\n---\n','',c,count=1,flags=re.S)
    for raw in re.findall(r'\[\[([^\]\n]+)\]\]',body):
        link_count+=1
        target=raw.split('|',1)[0].replace('\\','')
        target,sep,anchor=target.partition('#')
        resolved=r if not target else resolve(target)
        if not resolved:
            errors.append({'broken_link':r,'target':raw});continue
        graph[r].add(resolved)
        if sep and anchor not in headings[resolved]: errors.append({'broken_heading_link':r,'target':raw})
        if resolved in originals and anchor: source_links[resolved].add(anchor)

start='00_HOME/EVENSTAR_HOME.md'
seen=set()
todo=[start]
while todo:
    r=todo.pop()
    if r in seen:continue
    seen.add(r)
    todo.extend(graph[r]-seen)
unreachable=sorted(set(files)-seen)
if unreachable:errors.append({'unreachable_from_home':unreachable})

hashes=[]
covered=0
for m in manifest:
    rel='99_SOURCES/'+m['filename']
    raw=files[rel].read_bytes()
    ok=len(raw)==m['bytes'] and hashlib.sha256(raw).hexdigest()==m['sha256']
    hashes.append({'file':m['filename'],'bytes':len(raw),'sha256_matches':ok})
    if not ok: errors.append({'source_hash_mismatch':rel})
    if m['key']=='IDS': major=re.findall(r'^# (.+)$',texts[rel],re.M)[1:]
    else:major=re.findall(r'^#{1,2} (\d+\. .+)$',texts[rel],re.M)
    for h in major:
        if h not in source_links[rel]: errors.append({'uncovered_source_section':rel,'heading':h})
        else: covered+=1

future=metadata.get('11_FUTURE/PROJECT_DOCUMENT_GENERATION.md',{})
if future.get('status')!='future':errors.append({'document_generation_status':future.get('status')})
summary={'vault':str(root),'markdown_files':len(files),'derived_notes':len(metadata),'original_sources':len(originals),'wikilinks_checked':link_count,'home_reachable_notes':len(seen),'source_major_sections_covered':covered,'source_hashes':hashes,'requirements':sum(m.get('type')=='requirement' for m in metadata.values()),'accepted_requirements':sum(m.get('type')=='requirement' and m.get('status')=='accepted' for m in metadata.values()),'proposed_requirements':sum(m.get('type')=='requirement' and m.get('status')=='proposed' for m in metadata.values()),'current_adrs':sum(m.get('type')=='adr' for m in metadata.values()),'historical_adrs':sum(m.get('type')=='historical-adr' for m in metadata.values()),'open_questions':sum(m.get('type')=='open-question' for m in metadata.values()),'errors':errors,'passed':not errors}
print(json.dumps(summary,indent=2,ensure_ascii=False))
sys.exit(0 if not errors else 1)
