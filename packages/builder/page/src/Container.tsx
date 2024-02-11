import { Container as BuilderContainer } from "@fibr/builder";
import { PageCanvas } from "@fibr/canvas";
import { useFormBuilder } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { WorkflowDndWrapper } from "@fibr/workflow";

export function Container() {
  const { active, getBlock, update } = useFormBuilder(({ active, block }) => ({
    active,
    getBlock: block.get,
    update: block.update,
  }));

  const canvasId = active.canvas;
  const blockId = active.block;

  let block: ThreadType | undefined;

  if (canvasId && blockId) {
    block = getBlock(canvasId, blockId);

    if (!block) throw new Error("Unable find the block!");
  }

  return (
    <WorkflowDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <PageCanvas />
        {blockId && block && (
          <Settings
            {...block}
            {...block.data}
            id={blockId}
            _update={(values) =>
              canvasId && update(canvasId, blockId, { data: values })
            }
          />
        )}
      </BuilderContainer>
    </WorkflowDndWrapper>
  );
}
