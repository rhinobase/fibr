import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { Palette } from "./Palette";
import { Overview } from "./Overview";

export function Sidebar() {
  return (
    <BuilderSidebar>
      <Palette />
      <Overview />
    </BuilderSidebar>
  );
}
