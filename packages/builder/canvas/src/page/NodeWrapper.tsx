import { useFormBuilder } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { type PropsWithChildren } from "react";
import { NodeResizer } from "reactflow";

export function NodeWrapper(props: PropsWithChildren) {
  const { id } = useThread();
  const { activeBlock, select } = useFormBuilder(({ block, active }) => ({
    select: block.select,
    activeBlock: active.block,
  }));

  const onSelect = eventHandler(() => select(id));

  return (
    <div className="bg-white" onClick={onSelect} onKeyDown={onSelect}>
      <NodeResizer isVisible={activeBlock === id} />
      {props.children}
    </div>
  );
}
