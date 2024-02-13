import { Container as BuilderContainer } from "@fibr/builder";
import { WorkflowCanvas } from "@fibr/canvas";
import { useCanvas } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { WorkflowDndWrapper } from "./WorkflowDndWrapper";

export function Container() {
  const { active, getBlock, update } = useCanvas(({ active, block }) => ({
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
        <WorkflowCanvas />
        {blockId && block && (
          <Settings
            {...block}
            id={blockId}
            _update={(values) => canvasId && update(canvasId, blockId, values)}
          />
        )}
      </BuilderContainer>
    </WorkflowDndWrapper>
  );
}
