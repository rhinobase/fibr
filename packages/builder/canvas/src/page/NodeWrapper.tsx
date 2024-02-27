import { useCanvas } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { classNames, useBoolean } from "@rafty/ui";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { type PropsWithChildren } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  type ControlPosition,
  type Node,
  NodeResizeControl,
  ResizeControlVariant,
} from "reactflow";

export const PANELS = ["page", "group"];

export function NodeWrapper({ children }: PropsWithChildren) {
  const [, copyToClipboard] = useCopyToClipboard();
  const remove = useCanvas(({ remove }) => remove);
  const block = useThread<Node>();
  const { type, selected } = block;

  const isGroup = PANELS.includes(type);

  const ref = useHotkeys<HTMLDivElement>(
    "mod+c,mod+x",
    (_, { keys = [] }) => {
      copyToClipboard(JSON.stringify(block));
      if (keys[0] === "x") remove({ blockIds: block.id });
    },
    {
      enabled: selected,
    },
  );

  return (
    <div
      ref={ref}
      tabIndex={-1}
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
      {children}
    </div>
  );
}

function ResizeNodeBorder({ position }: { position: ControlPosition }) {
  const [resizing, toggle] = useBoolean();

  return (
    <NodeResizeControl
      variant={ResizeControlVariant.Line}
      position={position}
      style={{ border: "none" }}
      onResizeStart={() => toggle(true)}
      onResizeEnd={() => toggle(false)}
    >
      <div
        className={classNames(
          position === "left" ? "-left-px" : "-right-px",
          resizing ? "bg-primary-500 dark:bg-primary-400" : "bg-secondary-100",
          "ring-primary-500 dark:ring-primary-400 absolute top-1/2 h-8 w-1 -translate-y-1/2 rounded-md ring-1",
        )}
      />
    </NodeResizeControl>
  );
}
