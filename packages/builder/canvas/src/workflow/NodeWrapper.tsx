import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { type PropsWithChildren } from "react";
import type { Node } from "reactflow";

export function NodeWrapper(props: PropsWithChildren) {
  const { selected } = useThread<Node>();

  return (
    <div
      className={classNames(
        selected ? "border-primary-500" : "border-transparent",
        "h-full w-full border bg-white p-2",
      )}
    >
      {props.children}
    </div>
  );
}
