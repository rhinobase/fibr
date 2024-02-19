import { Settings as BuilderSettings } from "@fibr/builder";
import { FibrProvider, Thread } from "@fibr/react";
import { ReactNode, useMemo } from "react";
import { useBlocks } from "../providers";
import type { BlockType, BlockWithIdType } from "@fibr/providers";

export type Settings = BlockWithIdType & {
  _update: (values: Partial<BlockType>) => void;
};

export function Settings(props: Settings) {
  const config = useBlocks((state) => state.config);

  const settingBuilders = useMemo(
    () =>
      Object.entries(config).reduce<Record<string, () => ReactNode>>(
        (prev, [name, { settings }]) => {
          prev[name] = settings;
          return prev;
        },
        {},
      ),
    [config],
  );

  return (
    <FibrProvider plugins={settingBuilders}>
      <BuilderSettings className="flex flex-col gap-3">
        <Thread {...props} />
      </BuilderSettings>
    </FibrProvider>
  );
}
