import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { type PropsWithChildren } from "react";
import {
  ControlPosition,
  Node,
  NodeResizeControl,
  ResizeControlVariant,
} from "reactflow";

const PANELS = ["page"];

export function NodeWrapper(props: PropsWithChildren) {
  const { type, selected } = useThread<Node>();

  const isGroup = PANELS.includes(type);

  return (
    <div
      className={classNames(
        !isGroup && "p-2",
        selected ? "border-primary-500" : "border-transparent",
        "h-full w-full border bg-white",
      )}
    >
      {!isGroup && selected && (
        <>
          <ResizeNodeBorder position="left" />
          <ResizeNodeBorder position="right" />
        </>
      )}
      {props.children}
    </div>
  );
}

function ResizeNodeBorder({ position }: { position: ControlPosition }) {
  const { resizing } = useThread<Node>();

  return (
    <NodeResizeControl
      variant={ResizeControlVariant.Line}
      position={position}
      style={{ border: "none" }}
    >
      <div
        className={classNames(
          position === "left" ? "-left-px" : "-right-px",
          resizing ? "bg-blue-500" : "bg-white",
          "absolute top-1/2 h-8 w-1 -translate-y-1/2 rounded-md ring-1",
        )}
      />
    </NodeResizeControl>
  );
}
