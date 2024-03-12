import { ClipboardProvider } from "@fibr/providers";
import type { PropsWithChildren } from "react";

export function Container(props: PropsWithChildren) {
  return (
    <ClipboardProvider>
      <div className="relative flex-1 overflow-y-auto">{props.children}</div>
    </ClipboardProvider>
  );
}
