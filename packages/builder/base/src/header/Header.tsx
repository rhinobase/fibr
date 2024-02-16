import { classNames } from "@rafty/ui";
import { type HTMLAttributes, forwardRef } from "react";
import { Logo } from "./Logo";

export type Header = HTMLAttributes<HTMLDivElement>;

export const Header = forwardRef<HTMLDivElement, Header>(
  ({ className, children, ...props }, forwardedRef) => (
    <header
      {...props}
      className={classNames("flex w-full items-center px-2 py-0.5", className)}
      ref={forwardedRef}
    >
      <Logo className="w-6" />
      {children}
    </header>
  ),
);
Header.displayName = "Header";
