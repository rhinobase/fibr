import { Settings as BuilderSettings } from "@fibr/builder";
import { FibrProvider, Thread, type ThreadWithIdType } from "@fibr/react";
import { useSource } from "../providers";
import { ReactNode } from "react";

export function Settings(props: ThreadWithIdType) {
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
        <h4 className="font-medium">Settings</h4>
        <hr className="my-3" />
        <Thread {...props} />
      </BuilderSettings>
    </FibrProvider>
  );
}
