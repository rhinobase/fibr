import { classNames } from "@rafty/ui";
import { type HTMLAttributes, forwardRef } from "react";

export type Header = HTMLAttributes<HTMLDivElement>;

export const Header = forwardRef<HTMLDivElement, Header>(
  ({ className, ...props }, forwardedRef) => (
    <header
      {...props}
      className={classNames("flex w-full items-center p-1", className)}
      ref={forwardedRef}
    />
  ),
);
Header.displayName = "Header";
