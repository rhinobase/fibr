import type { ThreadType } from "../types";
import { Thread } from "./Thread";

export type Loom<T extends Record<string, unknown>> = {
  id: string;
  blueprint: ThreadType<T>;
};

export function Loom<T extends Record<string, unknown>>({
  id,
  blueprint,
}: Loom<T>) {
  return <Thread id={id} {...blueprint} />;
}
