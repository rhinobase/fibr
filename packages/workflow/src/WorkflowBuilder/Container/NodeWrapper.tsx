import { useBlocks } from "@fibr/builder";
import { classNames } from "@rafty/ui";
import { useField } from "duck-form";
import type { PropsWithChildren } from "react";
import type { Node } from "reactflow";

export function NodeWrapper(props: PropsWithChildren) {
  const { selected, type } = useField<Node>();
  const allowedEdgesType = useBlocks(({ config }) =>
    Object.entries(config).reduce<string[]>((prev, [name, block]) => {
      if (block.metadata?.node_type === "edge") prev.push(name);

      return prev;
    }, []),
  );

  if (allowedEdgesType.includes(type)) return props.children;

  return (
    <div
      className={classNames(
        selected
          ? "border-primary-500 dark:border-primary-400"
          : "border-transparent",
        "dark:bg-secondary-950 h-full w-full border bg-white p-2",
      )}
    >
      {props.children}
    </div>
  );
}
