"use client";
import { classNames } from "@rafty/ui";
import { type HTMLAttributes } from "react";
import { useBuilder, Env } from "@fibr/providers";
import { useDroppable } from "@dnd-kit/core";

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
        "border-secondary-200 absolute right-0 top-0 h-full w-96 border-l bg-white p-3",
        className,
      )}
      ref={setNodeRef}
    >
      <h4 className="font-medium">Settings</h4>
      <hr />
      {children}
    </div>
  );
}
