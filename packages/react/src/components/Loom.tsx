import { useId } from "react";
import type { ThreadType } from "../types";
import { Thread } from "./Thread";

export type Loom<T extends Record<string, unknown>> = {
  blueprint: ThreadType<T>;
};

export function Loom<T extends Record<string, unknown>>({
  blueprint,
}: Loom<T>) {
  const id = useId();

  return <Thread id={id} {...blueprint} />;
}
