import { classNames } from "@rafty/ui";
import { HTMLAttributes, forwardRef } from "react";

export type Footer = HTMLAttributes<HTMLDivElement>;

export const Footer = forwardRef<HTMLDivElement, Footer>(
  ({ className, ...props }, forwardedRef) => (
    <div
      {...props}
      className={classNames("flex w-full items-center p-1", className)}
      ref={forwardedRef}
    />
  ),
);
Footer.displayName = "Footer";
