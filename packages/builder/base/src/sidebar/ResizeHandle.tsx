import { classNames } from "@rafty/ui";
import {
  PanelResizeHandle,
  type PanelResizeHandleProps,
} from "react-resizable-panels";

export function ResizeHandle({
  className,
  disabled,
  ...props
}: PanelResizeHandleProps) {
  return (
    <PanelResizeHandle
      {...props}
      className={classNames(
        "group/handler pointer-events-auto relative w-1 bg-transparent",
        disabled && "hidden",
        className,
      )}
    >
      <div className="absolute left-0 h-full w-full transition-all ease-in-out group-hover/handler:bg-blue-500 group-data-[resize-handle-active]/handler:bg-blue-500" />
    </PanelResizeHandle>
  );
}
