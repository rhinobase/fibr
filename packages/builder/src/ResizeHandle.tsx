import { PanelResizeHandle } from "react-resizable-panels";

export function ResizeHandle() {
  return (
    <PanelResizeHandle className="bg-secondary-200 group/handler relative w-px">
      <div className="absolute -left-[2px] h-full w-1 transition-all ease-in-out hover:bg-blue-500 group-data-[resize-handle-active]/handler:bg-blue-500" />
    </PanelResizeHandle>
  );
}
