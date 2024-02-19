import { Container as BuilderContainer } from "@fibr/builder";
import { WorkflowCanvas } from "@fibr/canvas";
import { type BaseBlockType, useCanvas } from "@fibr/providers";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { WorkflowDndWrapper } from "./WorkflowDndWrapper";

export function Container() {
  const { active, get, update } = useCanvas(({ active, get, update }) => ({
    active,
    get,
    update,
  }));

  const blockId = active[0];
  let block: BaseBlockType | undefined;

  if (active.length === 1) {
    block = get(blockId);

    if (!block) throw new Error("Unable find the block!");
  }

  return (
    <WorkflowDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <WorkflowCanvas />
        {block && (
          <Settings
            {...block}
            id={blockId}
            _update={(values) => update(blockId, values)}
          />
        )}
      </BuilderContainer>
    </WorkflowDndWrapper>
  );
}
