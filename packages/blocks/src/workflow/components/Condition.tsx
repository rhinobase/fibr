import { Handle, Position } from "reactflow";

const ID = "condition";

export function ConditionNode() {
  return (
    <div className="relative p-2">
      <Handle type="target" position={Position.Left} />
      Condition Node
      <div className="absolute -right-0.5 top-0 flex h-full w-1 flex-col justify-around">
        {Array.from({ length: 2 }).map((_, index) => (
          <Handle
            id={`${index}-${ID}-source-right`}
            type="source"
            position={Position.Right}
            style={{
              position: "relative",
              right: "auto",
              top: "auto",
              transform: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
