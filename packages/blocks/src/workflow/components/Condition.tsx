import { Handle, Position } from "reactflow";

const ID = "condition";

export function ConditionNode() {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      Condition Node
      <div className="absolute left-full top-0 flex h-full flex-col justify-around">
        {Array.from({ length: 2 }).map((_, index) => {
          const uniqueId = `${index}-${ID}-source-right`;

          return (
            <Handle
              key={uniqueId}
              id={uniqueId}
              type="source"
              position={Position.Right}
              style={{
                position: "relative",
                right: "auto",
                top: "auto",
                transform: "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
