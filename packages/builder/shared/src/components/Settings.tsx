import { Settings as BuilderSettings } from "@fibr/builder";
import { FibrProvider, Thread, type ThreadWithIdType } from "@fibr/react";
import { ReactNode } from "react";
import { useSource } from "../providers";

export type Settings<T extends Record<string, unknown>> =
  ThreadWithIdType<T> & {
    _update: (values: Partial<T>) => void;
  };

export function Settings<T extends Record<string, unknown>>(
  props: Settings<T>,
) {
  const config = useSource((state) => state.config);

  const settingBuilders = Object.entries(config).reduce<
    Record<string, () => ReactNode>
  >((prev, [name, { settings }]) => {
    prev[name] = settings;
    return prev;
  }, {});

  return (
    <FibrProvider plugins={settingBuilders}>
      <BuilderSettings className="flex flex-col gap-3">
        <Thread {...props} />
      </BuilderSettings>
    </FibrProvider>
  );
}
