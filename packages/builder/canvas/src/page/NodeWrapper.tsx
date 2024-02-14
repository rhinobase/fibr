import { useCanvas } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { type PropsWithChildren } from "react";
import { NodeResizer } from "reactflow";

const PANELS = ["page"];

export function NodeWrapper(props: PropsWithChildren) {
  const { id, type } = useThread();
  const { activeBlock, select } = useCanvas(({ block, active }) => ({
    select: block.select,
    activeBlock: active.block,
  }));

  const onSelect = eventHandler(() => select(id));

  return (
    <div
      className="h-full w-full bg-white"
      onClick={onSelect}
      onKeyDown={onSelect}
    >
      {!PANELS.includes(type) && <NodeResizer isVisible={activeBlock === id} />}
      {props.children}
    </div>
  );
}
