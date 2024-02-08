import { Container as BuilderContainer, Env, useBuilder } from "@fibr/builder";
import { useFormBuilder } from "@fibr/providers";
import { FormBuilderCanvas } from "@fibr/canvas";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import type { ThreadType } from "@fibr/react";

export function Container() {
  const isDevelopment = useBuilder(
    (state) => state.env.current === Env.DEVELOPMENT,
  );
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
    <BuilderContainer>
      {isDevelopment && <Sidebar />}
      <FormBuilderCanvas />
      {isDevelopment && blockId && block && (
        <Settings
          {...block}
          id={blockId}
          _update={(values) => canvasId && update(canvasId, blockId, values)}
        />
      )}
    </BuilderContainer>
  );
}