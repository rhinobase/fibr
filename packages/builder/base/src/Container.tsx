import type { PropsWithChildren } from "react";

export type Container = PropsWithChildren;

export function Container({ children }: Container) {
  return <div className="relative flex-1 overflow-y-auto">{children}</div>;
}
