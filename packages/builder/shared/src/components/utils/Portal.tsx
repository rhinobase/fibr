import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

// Functional component representing a portal
export function Portal({ children }: PropsWithChildren) {
  return createPortal(children, document.body);
}
