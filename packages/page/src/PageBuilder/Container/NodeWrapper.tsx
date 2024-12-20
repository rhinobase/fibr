import { classNames, useBoolean } from "@rafty/ui";
import { useField } from "duck-form";
import type { PropsWithChildren } from "react";
import {
  NodeResizeControl,
  ResizeControlVariant,
  type ControlPosition,
  type Node,
} from "reactflow";

export const PANELS = ["page", "object"];

export function NodeWrapper(props: PropsWithChildren) {
  const { type, selected } = useField<Node>();

  const isGroup = PANELS.includes(type);

  return (
    <div
      className={classNames(
        !isGroup && "p-2",
        selected
          ? "border-primary-500 dark:border-primary-400"
          : "border-transparent dark:border-transparent",
        "dark:bg-secondary-950 h-full w-full border bg-white",
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

type ResizeNodeBorder = { position: ControlPosition };

function ResizeNodeBorder(props: ResizeNodeBorder) {
  const [resizing, toggle] = useBoolean();

  return (
    <NodeResizeControl
      variant={ResizeControlVariant.Line}
      position={props.position}
      style={{ border: "none" }}
      onResizeStart={() => toggle(true)}
      onResizeEnd={() => toggle(false)}
    >
      <div
        className={classNames(
          props.position === "left" ? "-left-px" : "-right-px",
          resizing ? "bg-primary-500 dark:bg-primary-400" : "bg-secondary-100",
          "ring-primary-500 dark:ring-primary-400 absolute top-1/2 h-8 w-1 -translate-y-1/2 rounded-md ring-1",
        )}
      />
    </NodeResizeControl>
  );
}
