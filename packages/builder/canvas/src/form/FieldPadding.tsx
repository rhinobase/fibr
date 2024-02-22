import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { PropsWithChildren } from "react";

export function FieldPadding({ children }: PropsWithChildren) {
  const { type } = useThread();

  return (
    <div
      className={classNames(
        type === "canvas" ? "dark:bg-secondary-950 bg-white p-6" : "p-4",
        "w-full border border-transparent",
      )}
    >
      {children}
    </div>
  );
}
