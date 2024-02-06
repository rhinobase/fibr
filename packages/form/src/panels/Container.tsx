import { Container as BuilderContainer } from "@fibr/builder";
import { useBlueprint } from "../providers";
import { Canvas } from "./Canvas";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import type { ThreadType } from "@fibr/react";

export function Container() {
  const { active, getBlock, update } = useBlueprint(({ active, blocks }) => ({
    active,
    getBlock: blocks.get,
    update: blocks.update,
  }));

  const formId = active.form;
  const blockId = active.block;

  let block: ThreadType | undefined;

  if (formId && blockId) {
    block = getBlock(formId, blockId);

    if (!block) throw new Error("Unable find the block!");
  }

  return (
    <BuilderContainer>
      <Sidebar />
      <Canvas />
      {blockId && block && (
        <Settings
          {...block}
          id={blockId}
          _update={(values) => formId && update(formId, blockId, values)}
        />
      )}
    </BuilderContainer>
  );
}
