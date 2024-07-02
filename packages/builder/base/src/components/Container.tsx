import { forwardRef, type HTMLAttributes } from "react";
import { ClipboardProvider } from "../providers";

export type Container = HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef<HTMLDivElement, Container>(
  function Container(props, forwardedRef) {
    return (
      <ClipboardProvider>
        <div {...props} ref={forwardedRef} />
      </ClipboardProvider>
    );
  },
);
