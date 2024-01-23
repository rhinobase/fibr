import { classNames } from "@rafty/ui";
import { HTMLAttributes, forwardRef } from "react";

export type Screen = HTMLAttributes<HTMLDivElement>;

export const Screen = forwardRef<HTMLDivElement, Screen>(
  ({ className, ...props }, forwardedRef) => (
    <div
      {...props}
      className={classNames(
        "dark:bg-secondary-950 bg-white shadow-lg shadow-black/5 dark:shadow-transparent",
        className,
      )}
      ref={forwardedRef}
    />
  ),
);
Screen.displayName = "Screen";
