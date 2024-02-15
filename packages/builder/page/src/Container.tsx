import { Container as BuilderContainer } from "@fibr/builder";
import { PageCanvas } from "@fibr/canvas";
import { useCanvas } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { PageDndWrapper } from "./PageDndWrapper";

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

  const blockData = {
    type: "",
    ...block,
    ...(typeof block?.data === "object" ? block.data : {}),
  };

  return (
    <PageDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <PageCanvas />
        {blockId && block && (
          <Settings
            {...blockData}
            id={blockId}
            _update={(values) =>
              canvasId && update(canvasId, blockId, { data: values })
            }
          />
        )}
      </BuilderContainer>
    </PageDndWrapper>
  );
}
