import { Button } from "@rafty/ui";
import { AiOutlineSisternode, AiOutlineSubnode } from "react-icons/ai";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";

export function ServiceNode(props: NodeProps<null>) {
  return (
    <>
      <NodeToolbar isVisible position={Position.Right}>
        <Button
          size="fab"
          className="!p-1"
          //   onClick={() =>
          //     add(
          //       service({
          //         label: "Sample",
          //         type: "node",
          //       }),
          //       node.data.id,
          //     )
          //   }
        >
          <AiOutlineSubnode size={20} />
        </Button>
      </NodeToolbar>
      <NodeToolbar isVisible position={Position.Bottom}>
        <Button
          size="fab"
          className="!p-1"
          //   onClick={() =>
          //     add(
          //       service({ label: "Sample1", type: "node" }),
          //       node.data.parent,
          //       node.data.id,
          //     )
          //   }
        >
          <AiOutlineSisternode size={20} />
        </Button>
      </NodeToolbar>
      <div
        data-selected={props.selected}
        className="bg-secondary-100 dark:bg-secondary-800 data-[selected=true]:border-secondary-400 dark:data-[selected=true]:border-secondary-600 relative !rounded border border-transparent p-1 leading-none"
      >
        <Handle
          id="target_left"
          type="target"
          position={Position.Left}
          className="invisible"
        />
        <Handle
          id="target_right"
          type="target"
          position={Position.Right}
          className="invisible"
        />
        Service Node
        <Handle
          id="source_left"
          type="source"
          position={Position.Left}
          className="invisible"
        />
        <Handle
          id="source_right"
          type="source"
          position={Position.Right}
          className="invisible"
        />
      </div>
    </>
  );
}
