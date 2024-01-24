"use client";
import { FibrProvider } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { HTMLAttributes, forwardRef } from "react";

export type Settings = HTMLAttributes<HTMLDivElement> & {
  panels?: Record<string, () => JSX.Element>;
};

export const Settings = forwardRef<HTMLDivElement, Settings>(
  ({ panels = [], className, ...props }, forwardedRef) => (
    <FibrProvider plugins={panels}>
      <div
        {...props}
        className={classNames(
          "border-secondary-200 dark:border-secondary-800 h-full w-96 border-l p-3",
          className,
        )}
        ref={forwardedRef}
      />
    </FibrProvider>
  ),
);
Settings.displayName = "Settings";
