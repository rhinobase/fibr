import { useId } from "react";
import type { ThreadType } from "../types";
import { Thread } from "./Thread";

export type Loom<T extends Record<string, unknown>> = {
  id?: string;
  blueprint: ThreadType<T>;
};

export function Loom<T extends Record<string, unknown>>({
  id,
  blueprint,
}: Loom<T>) {
  const generatedId = useId();

  return <Thread id={id ?? generatedId} {...blueprint} />;
}
