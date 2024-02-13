import { classNames } from "@rafty/ui";
import {
  PanelResizeHandle,
  type PanelResizeHandleProps,
} from "react-resizable-panels";

export function ResizeHandle({ className, ...props }: PanelResizeHandleProps) {
  return (
    <PanelResizeHandle
      {...props}
      className={classNames(
        "group/handler border-secondary-200 relative w-1 border-r bg-transparent data-[panel-resize-handle-enabled=false]/handler:hidden",
        className,
      )}
    >
      <div className="absolute left-0 h-full w-full transition-all ease-in-out group-hover/handler:bg-blue-500 group-data-[resize-handle-active]/handler:bg-blue-500" />
    </PanelResizeHandle>
  );
}
