import { Button } from "@rafty/ui";
import { AiOutlineSubnode } from "react-icons/ai";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";

export function MainNode(props: NodeProps<null>) {
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
      <div
        data-selected={props.selected}
        className="bg-secondary-100 dark:bg-secondary-800 data-[selected=true]:border-secondary-400 dark:data-[selected=true]:border-secondary-600 !rounded border border-transparent p-1 leading-none"
      >
        <Handle
          id="source_left"
          type="source"
          position={Position.Left}
          className="invisible"
        />
        Main Node
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
