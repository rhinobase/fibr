import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { PropsWithChildren } from "react";

export function FieldPadding({ children }: PropsWithChildren) {
  const { type } = useThread();

  return (
    <div
      className={classNames(type === "form" ? "bg-white p-6" : "p-4", "w-full")}
    >
      {children}
    </div>
  );
}
