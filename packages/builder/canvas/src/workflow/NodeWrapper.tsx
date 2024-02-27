import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { type PropsWithChildren } from "react";
import type { Node } from "reactflow";
import { CopyWrapper } from "../utils";

export function NodeWrapper(props: PropsWithChildren) {
  const { selected } = useThread<Node>();

  return (
    <CopyWrapper
      className={classNames(
        selected
          ? "border-primary-500 dark:border-primary-400"
          : "border-transparent",
        "dark:bg-secondary-950 h-full w-full border bg-white p-2",
      )}
    >
      {props.children}
    </CopyWrapper>
  );
}
