import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { PropsWithChildren } from "react";
import { PANELS } from "./NodeWrapper";
import type { Node } from "reactflow";

export function NodePadding({ children }: PropsWithChildren) {
  const { type } = useThread<Node>();

  const isGroup = PANELS.includes(type);

  return (
    <div
      className={classNames(
        !isGroup && "p-2",
        "dark:bg-secondary-950 h-full w-full border border-transparent bg-white",
      )}
    >
      {children}
    </div>
  );
}
