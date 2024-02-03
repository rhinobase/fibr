import { Settings as BuilderSettings } from "@fibr/builder";
import { Thread } from "@fibr/react";
import { settingsPanel } from "./settingsConfig";
import { useBlueprint } from "../providers";

export function Settings() {
  const { get, activeBlock, activeForm } = useBlueprint(
    ({ blocks, active }) => ({
      get: blocks.get,
      activeForm: active.form,
      activeBlock: active.block,
    }),
  );

  if (!activeForm || !activeBlock)
    throw new Error("Unable to find an active form!");

  const block = get(activeForm, activeBlock);

  if (!block) throw new Error("Unable find the block!");

  const settings = settingsPanel[block.type];

  return (
    <BuilderSettings className="flex flex-col gap-3">
      <h4 className="font-medium">Settings</h4>
      <hr className="my-3" />
      <p className="text-secondary-600 text-sm font-medium">{block.type}</p>
      <p className="text-secondary-600 text-sm font-medium">{activeBlock}</p>
      <Thread id={activeBlock} {...settings} />
    </BuilderSettings>
  );
}
