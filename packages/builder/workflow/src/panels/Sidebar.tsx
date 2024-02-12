import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { CodeGenerator, Palette } from "@fibr/shared";

export function Sidebar() {
  const { addBlock, active } = useCanvas(({ block, active }) => ({
    active,
    addBlock: block.add,
  }));

  const canvasId = active.canvas;

  return (
    <BuilderSidebar>
      <Palette
        enableDragging
        isDisabled={canvasId == null}
        onBlockSelect={(props) => canvasId && addBlock(canvasId, props)}
      />
      <CodeGenerator />
    </BuilderSidebar>
  );
}
