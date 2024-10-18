import {
  PanelResizeHandle,
  type PanelResizeHandleProps,
} from "react-resizable-panels";
import { useBuilder } from "../../providers";
import { classNames } from "../../utils";

export function ResizeHandle({
  className,
  children,
  ...props
}: PanelResizeHandleProps) {
  const isDisabled = useBuilder(
    ({ layout: { sidebar }, tabs: { get, active } }) => {
      const currentTab = active != null ? get(active) : undefined;
      return !sidebar || currentTab?.isResizeable === false;
    },
  );

  return (
    <PanelResizeHandle
      {...props}
      className={classNames(
        "group/handler pointer-events-auto relative w-1 bg-transparent",
        isDisabled && "hidden",
      )}
    >
      {children ?? (
        <div className="absolute left-0 h-full w-full transition-all ease-in-out group-hover/handler:bg-blue-500 group-data-[resize-handle-active]/handler:bg-blue-500" />
      )}
    </PanelResizeHandle>
  );
}
