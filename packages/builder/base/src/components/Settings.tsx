import { useDroppable } from "@dnd-kit/core";
import { Env, useBuilder } from "../providers";
import { classNames } from "@rafty/ui";
import type { HTMLAttributes } from "react";

export type Settings = HTMLAttributes<HTMLDivElement>;

export function Settings({ className, children, ...props }: Settings) {
  const { setNodeRef } = useDroppable({ id: "settings" });
  const isProduction = useBuilder(
    (state) => state.env.current === Env.PRODUCTION,
  );

  if (isProduction) return;

  return (
    <div
      {...props}
      className={classNames(
        "absolute right-0 top-0 h-full w-96 p-3",
        className,
      )}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}
