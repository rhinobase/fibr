import { buttonClasses } from "@rafty/ui";
import { classNames } from "@fibr/builder";
import type { HTMLAttributes } from "react";

export type CustomButton = HTMLAttributes<HTMLSpanElement>;

export function CustomButton({ className, ...props }: CustomButton) {
  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({ size: "icon", variant: "ghost" }),
        "cursor-pointer rounded p-0.5 transition-none",
        className,
      )}
    />
  );
}
