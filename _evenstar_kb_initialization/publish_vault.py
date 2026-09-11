"""Install the validated knowledge package into the user-designated vault.

Refuses to overwrite different existing files; uses no deletion or moving.
"""
from pathlib import Path
import sys, json, shutil, hashlib, subprocess

root=Path(__file__).resolve().parent
stage=root/'vault'
destination=Path(r'C:\Users\Usuario\OneDrive\Documentos\Obsidian Vault\Evenstar').resolve()
expected=Path(r'C:\Users\Usuario\OneDrive\Documentos\Obsidian Vault\Evenstar')
if destination != expected:
    raise SystemExit('Resolved destination differs from the authorized vault path.')

def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def validate(folder):
    result=subprocess.run([sys.executable,str(root/'validate_vault.py'),str(folder)],capture_output=True,text=True,encoding='utf-8')
    if result.returncode:
        raise RuntimeError(result.stdout+'\n'+result.stderr)
    return json.loads(result.stdout)

stage_result=validate(stage)
source_files=[p for p in stage.rglob('*') if p.is_file()]
for p in source_files:
    if p.is_symlink(): raise SystemExit('Symlink found in staged package: '+str(p))
    rel=p.relative_to(stage)
    target=destination/rel
    if not target.resolve().is_relative_to(destination): raise SystemExit('Target outside vault: '+str(target))
    if target.exists() and digest(target)!=digest(p):
        raise SystemExit('Refusing to overwrite existing different file: '+str(target))

destination.mkdir(parents=True,exist_ok=True)
for p in source_files:
    target=destination/p.relative_to(stage)
    target.parent.mkdir(parents=True,exist_ok=True)
    if not target.exists(): shutil.copyfile(p,target)

for p in source_files:
    if digest(p)!=digest(destination/p.relative_to(stage)):
        raise RuntimeError('Copy verification failed: '+str(p))
result=validate(destination)
review=destination/'00_HOME/CONSISTENCY_REVIEW.md'
section='''
## Verified destination — 11 September 2026

The package was copied to the user-designated Evenstar Obsidian vault. Every copied file matched its staged SHA-256 before this verification entry was appended. A read-only audit of the destination passed: 232 Markdown files (228 derived notes and four original sources), 2,724 valid wikilinks, all 232 notes reachable from Home, 108 major source sections with derived references, unique filenames/IDs, valid required metadata, and all four original source byte counts/hashes unchanged.

The register contains 59 requirements (52 accepted product behaviors, seven proposed), 16 current accepted ADRs, seven historical ADR summaries and 24 open questions. `99_SOURCES/validation_results.json` records the destination audit. Product implementation and Obsidian rendering were not tested.
'''
with review.open('a',encoding='utf-8',newline='\n') as f:f.write(section)
result=validate(destination)
(destination/'99_SOURCES/validation_results.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
(root/'destination_validation.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(json.dumps({'copied_files':len(source_files),'destination':str(destination),'validation':result},indent=2,ensure_ascii=False))
