import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { Palette } from "@fibr/shared";
import { useFormBuilder } from "@fibr/providers";

export function Sidebar() {
  const { addBlock, active } = useFormBuilder(({ block, active }) => ({
    active,
    addBlock: block.add,
  }));

  const canvasId = active.canvas;

  return (
    <BuilderSidebar>
      <Palette
        isDisabled={canvasId == null}
        onBlockSelect={(props) => canvasId && addBlock(canvasId, props)}
      />
    </BuilderSidebar>
  );
}
