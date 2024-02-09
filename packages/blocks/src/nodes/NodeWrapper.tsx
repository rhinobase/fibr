import { type PropsWithChildren } from "react";
import { Handle, type HandleProps, type NodeProps } from "reactflow";

export type NodeWrapper = PropsWithChildren<
  {
    handles: Pick<HandleProps, "position" | "type">[];
  } & Pick<NodeProps, "id">
>;

export function NodeWrapper({ id, children, handles }: NodeWrapper) {
  return (
    <div className="rounded bg-white p-2 text-sm leading-none">
      {children}
      {handles.map((handle) => (
        <Handle
          key={`${id}_${handle.type}_${handle.position}`}
          id={`${id}_${handle.type}_${handle.position}`}
          type={handle.type}
          position={handle.position}
        />
      ))}
    </div>
  );
}
