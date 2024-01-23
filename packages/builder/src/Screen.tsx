import { classNames } from "@rafty/ui";
import { HTMLAttributes, forwardRef } from "react";

export type Screen = HTMLAttributes<HTMLDivElement>;

export const Screen = forwardRef<HTMLDivElement, Screen>(
  ({ className, ...props }, forwardedRef) => (
    <div
      {...props}
      className={classNames(
        "h-[500px] w-[500px] bg-white shadow-lg shadow-black/5",
        className,
      )}
      ref={forwardedRef}
    />
  ),
);
Screen.displayName = "Screen";
