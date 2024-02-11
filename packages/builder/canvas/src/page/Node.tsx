import { useFormBuilder } from "@fibr/providers";
import { Thread, type ThreadWithIdType } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { NodeResizer, type NodeProps } from "reactflow";

export function CustomNode(props: ThreadWithIdType<NodeProps>) {
  const { id } = props;
  const { activeBlock, select } = useFormBuilder(({ block, active }) => ({
    select: block.select,
    activeBlock: active.block,
  }));

  const onSelect = eventHandler(() => select(id));

  return (
    <div className="bg-white" onClick={onSelect} onKeyDown={onSelect}>
      <NodeResizer isVisible={activeBlock === id} />
      <Thread {...props} {...props.data} />
    </div>
  );
}
