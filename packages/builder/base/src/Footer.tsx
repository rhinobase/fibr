import { classNames } from "@rafty/ui";
import { type HTMLAttributes, forwardRef } from "react";

export type Footer = HTMLAttributes<HTMLDivElement>;

export const Footer = forwardRef<HTMLDivElement, Footer>(
  ({ className, ...props }, forwardedRef) => (
    <footer
      {...props}
      className={classNames("flex w-full items-center", className)}
      ref={forwardedRef}
    />
  ),
);
Footer.displayName = "Footer";
