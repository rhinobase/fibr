import { useThread } from "@fibr/react";
import { classNames } from "@fibr/builder";
import type { PropsWithChildren } from "react";

export function FieldPadding(props: PropsWithChildren) {
  const { type } = useThread();

  return (
    <div
      className={classNames(
        type === "canvas" ? "dark:bg-secondary-950 bg-white p-6" : "p-4",
        "w-full border border-transparent empty:hidden",
      )}
    >
      {props.children}
    </div>
  );
}
