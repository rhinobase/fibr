import { classNames } from "@rafty/ui";
import { useField } from "duck-form";
import type { PropsWithChildren } from "react";
import type { Node } from "reactflow";
import { PANELS } from "./NodeWrapper";

export function NodePadding(props: PropsWithChildren) {
  const { type } = useField<Node>();

  const isGroup = PANELS.includes(type);

  return (
    <div
      className={classNames(
        !isGroup && "p-2",
        "dark:bg-secondary-950 h-full w-full border border-transparent bg-white",
      )}
    >
      {props.children}
    </div>
  );
}
