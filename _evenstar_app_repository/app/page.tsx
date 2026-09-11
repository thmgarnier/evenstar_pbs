import { ObjectExplorer } from "@/components/object-explorer";
import { loadSeedProject } from "@/lib/load-project";

export const dynamic = "force-dynamic";

export default async function Home() {
  const project = await loadSeedProject();
  return <ObjectExplorer project={project} />;
}
