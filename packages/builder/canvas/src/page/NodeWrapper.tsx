import { useCanvas } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { type PropsWithChildren } from "react";
import { NodeResizer } from "reactflow";

const PANELS = ["page"];

export function NodeWrapper(props: PropsWithChildren) {
  const { id, type } = useThread();
  const { active, select } = useCanvas(({ select, active }) => ({
    select,
    active,
  }));

  const onSelect = eventHandler(() => select({ blockId: id }));

  return (
    <div
      className="h-full w-full bg-white p-2"
      onClick={onSelect}
      onKeyDown={onSelect}
    >
      {!PANELS.includes(type) && (
        <NodeResizer isVisible={active.includes(id)} />
      )}
      {props.children}
    </div>
  );
}
