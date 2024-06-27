import type { PropsWithChildren } from "react";
import { Handle, type HandleProps, type NodeProps } from "reactflow";

export type NodeWrapper = PropsWithChildren<
  {
    handles: Pick<HandleProps, "position" | "type">[];
  } & Pick<NodeProps, "id">
>;

export function NodeWrapper({ id, children, handles }: NodeWrapper) {
  return (
    <div>
      {children}
      {handles.map((handle, index) => {
        const uniqueId = `${index}-${id}-${handle.type}-${handle.position}`;
        return (
          <Handle
            key={uniqueId}
            id={uniqueId}
            type={handle.type}
            position={handle.position}
          />
        );
      })}
    </div>
  );
}
