import { ClipboardProvider } from "@fibr/providers";
import type { PropsWithChildren } from "react";

export type Container = PropsWithChildren;

export function Container({ children }: Container) {
  return (
    <ClipboardProvider>
      <div className="relative flex-1 overflow-y-auto">{children}</div>
    </ClipboardProvider>
  );
}
