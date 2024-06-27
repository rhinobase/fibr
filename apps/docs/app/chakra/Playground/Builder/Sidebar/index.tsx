import { FloatingSidebar, useCanvas } from "@fibr/builder";
import { Palette } from "./Palette";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);

  return (
    <FloatingSidebar>
      <Palette enableDragging onSelect={(value) => add({ blockData: value })} />
    </FloatingSidebar>
  );
}
