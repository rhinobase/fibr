import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: PropsWithChildren) {
  return createPortal(children, document.body);
}
