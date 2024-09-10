import { useDroppable } from "@dnd-kit/core";
import type { HTMLAttributes } from "react";
import { Env, useBuilder } from "../providers";

export type Settings = HTMLAttributes<HTMLDivElement>;

export function Settings(props: Settings) {
  const { setNodeRef } = useDroppable({ id: "settings" });
  const isProduction = useBuilder(
    (state) => state.env.current === Env.PRODUCTION,
  );

  if (isProduction) return;

  return <div {...props} ref={setNodeRef} />;
}
