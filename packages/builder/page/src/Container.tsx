import { Container as BuilderContainer } from "@fibr/builder";
import { PageCanvas } from "@fibr/canvas";
import { type BlockType, useCanvas } from "@fibr/providers";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { PageDndWrapper } from "./PageDndWrapper";

export function Container() {
  const { active, get, update } = useCanvas(({ active, get, update }) => ({
    active,
    get,
    update,
  }));

  const blockId = active[0];
  let block: BlockType | undefined;

  if (active.length === 1) {
    block = get(blockId);

    if (!block) throw new Error("Unable find the block!");
  }

  return (
    <PageDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <PageCanvas />
        {block && (
          <Settings
            {...block}
            id={blockId}
            _update={(values) => update(blockId, values)}
          />
        )}
      </BuilderContainer>
    </PageDndWrapper>
  );
}
