import { FibrProvider, Thread } from "@fibr/react";

export type Settings = {
  panels?: Record<string, () => JSX.Element>;
};

export function Settings({ panels = {} }: Settings) {
  return (
    <FibrProvider plugins={panels}>
      <div className="flex h-full w-80 items-center justify-center">
        <Thread name="settings" type="string" />
      </div>
    </FibrProvider>
  );
}
