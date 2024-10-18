import { forwardRef, type HTMLAttributes } from "react";

export type Canvas = HTMLAttributes<HTMLDivElement>;

export const Canvas = forwardRef<HTMLDivElement, Canvas>(
  function Canvas(props, forwardedRef) {
    return <div {...props} ref={forwardedRef} />;
  },
);
