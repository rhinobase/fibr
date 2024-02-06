import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { Forms } from "./Forms";
import { Palette, Overview } from "@fibr/shared";
import { useBlueprint } from "../../providers";

export function Sidebar() {
  const {
    addBlock,
    getAllBlocks,
    active,
    selectBlock,
    removeBlock,
    moveBlock,
  } = useBlueprint(({ blocks, active }) => ({
    active,
    addBlock: blocks.add,
    getAllBlocks: blocks.all,
    selectBlock: blocks.select,
    removeBlock: blocks.remove,
    moveBlock: blocks.move,
  }));

  const formId = active.form;

  const currentFormBlocks = formId ? getAllBlocks(formId) : [];

  return (
    <BuilderSidebar>
      <Palette
        isDisabled={formId == null}
        onBlockSelect={(props) => formId && addBlock(formId, props)}
      />
      <Overview
        blocks={currentFormBlocks}
        active={active}
        selectBlock={selectBlock}
        removeBlock={(id) => formId && removeBlock(formId, id)}
        moveBlock={(startBlockId, endblockId) =>
          formId && moveBlock(formId, startBlockId, endblockId)
        }
      />
      <Forms />
    </BuilderSidebar>
  );
}
