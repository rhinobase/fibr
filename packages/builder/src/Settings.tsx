"use client";
import { FibrProvider, Thread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { HTMLAttributes, forwardRef } from "react";

export type Settings = HTMLAttributes<HTMLDivElement> & {
  panels?: Record<string, () => JSX.Element>;
};

export const Settings = forwardRef<HTMLDivElement, Settings>(
  ({ panels = {}, className, children, ...props }, forwardedRef) => (
    <FibrProvider plugins={panels}>
      <div
        {...props}
        className={classNames(
          "border-secondary-200 dark:border-secondary-800 flex h-full w-80 items-center justify-center border-l p-4 text-center",
          className,
        )}
        ref={forwardedRef}
      >
        <Thread name="settings" type="string" />
        {children}
      </div>
    </FibrProvider>
  ),
);
Settings.displayName = "Settings";
