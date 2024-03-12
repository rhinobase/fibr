import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export function Portal(props: PropsWithChildren) {
  return createPortal(props.children, document.body);
}
