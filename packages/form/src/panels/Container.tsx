import { Container as BuilderContainer } from "@fibr/builder";
import { useBlueprint } from "../providers";
import { Canvas } from "./Canvas";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { settingsPanel } from "./settingsConfig";
import type { ThreadWithIdType } from "@fibr/react";

export function Container() {
  const { active, getBlock } = useBlueprint(({ active, blocks }) => ({
    active,
    getBlock: blocks.get,
  }));

  const formId = active.form;
  const blockId = active.block;

  let settingsConfig: ThreadWithIdType | null = null;

  if (formId && blockId) {
    const block = getBlock(formId, blockId);

    if (!block) throw new Error("Unable find the block!");

    settingsConfig = { id: block.type, ...settingsPanel[block.type] };
  }

  return (
    <BuilderContainer>
      <Sidebar />
      <Canvas />
      {settingsConfig && <Settings {...settingsConfig} />}
    </BuilderContainer>
  );
}
