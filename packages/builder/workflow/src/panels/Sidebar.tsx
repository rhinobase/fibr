import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useFormBuilder } from "@fibr/providers";
import { Palette } from "@fibr/shared";

export function Sidebar() {
  const { addBlock, active } = useFormBuilder(({ block, active }) => ({
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
    </BuilderSidebar>
  );
}
