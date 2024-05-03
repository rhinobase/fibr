import { Text, classNames } from "@rafty/ui";
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
      <a
        title="Fibr Logo"
        href="https://www.rhinobase.io/"
        className="flex select-none items-baseline gap-0.5"
      >
        <Logo className="h-4 w-auto" />
        <Text className="text-xl font-bold italic">Fibr</Text>
      </a>
      {children}
    </header>
  ),
);
Header.displayName = "Header";
