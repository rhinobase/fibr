import { Settings as BuilderSettings } from "@fibr/builder";
import { FibrProvider, Thread } from "@fibr/react";
import { ReactNode, useMemo } from "react";
import { useBlocks } from "../providers";
import type { BaseBlockType, BaseBlockWithIdType } from "@fibr/providers";

export type Settings = BaseBlockWithIdType & {
  _update: (values: Partial<BaseBlockType>) => void;
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
