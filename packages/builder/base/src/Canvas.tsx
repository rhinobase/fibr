import { classNames } from "@rafty/ui";
import { forwardRef, type HTMLAttributes } from "react";

export type Canvas = HTMLAttributes<HTMLDivElement>;

export const Canvas = forwardRef<HTMLDivElement, Canvas>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        className={classNames(
          "bg-secondary-100 flex h-full items-start justify-center overflow-y-auto",
          className,
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
Canvas.displayName = "Canvas";
