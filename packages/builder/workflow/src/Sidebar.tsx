import { FloatingSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { CodeGenerator, InspectorPanel, Palette } from "@fibr/shared";

export function Sidebar() {
  const { addBlock, active } = useCanvas(({ block, active }) => ({
    active,
    addBlock: block.add,
  }));

  const canvasId = active.canvas;

  return (
    <FloatingSidebar>
      <Palette
        enableDragging
        isDisabled={canvasId == null}
        onBlockSelect={(props) => canvasId && addBlock(canvasId, props)}
      />
      <InspectorPanel />
      <CodeGenerator />
    </FloatingSidebar>
  );
}
