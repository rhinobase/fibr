import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { Forms } from "./Forms";
import { Overview } from "./Overview";
import { Palette } from "./Palette";

export function Sidebar() {
  return (
    <BuilderSidebar>
      <Palette />
      <Overview />
      <Forms />
    </BuilderSidebar>
  );
}
