import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="flex flex-1">{children}</div>;
}
