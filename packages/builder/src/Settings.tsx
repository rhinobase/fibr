"use client";
import { FibrProvider, Thread } from "@fibr/react";

export type Settings = {
  panels?: Record<string, () => JSX.Element>;
};

export function Settings({ panels = {} }: Settings) {
  return (
    <FibrProvider plugins={panels}>
      <div className="border-secondary-200 dark:border-secondary-800 flex h-full w-80 items-center justify-center border-l p-4 text-center">
        <Thread name="settings" type="string" />
      </div>
    </FibrProvider>
  );
}
