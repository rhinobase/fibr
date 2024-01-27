"use client";
import { FibrProvider } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { HTMLAttributes } from "react";
import { useBuilder } from "./providers";
import { Env } from "./utils";

export type Settings = HTMLAttributes<HTMLDivElement> & {
  panels?: Record<string, () => JSX.Element>;
};

export function Settings({ panels = {}, className, ...props }: Settings) {
  const { env } = useBuilder();

  if (env.current === Env.PRODUCTION) return;

  return (
    <FibrProvider plugins={panels}>
      <div
        {...props}
        className={classNames(
          "border-secondary-200 dark:border-secondary-800 h-full w-96 border-l p-3",
          className,
        )}
      />
    </FibrProvider>
  );
}
