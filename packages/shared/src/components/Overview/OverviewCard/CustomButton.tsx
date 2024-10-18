import { buttonClasses, classNames } from "@rafty/ui";
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
