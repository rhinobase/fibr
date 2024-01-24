import type { ThreadWithIdType } from "../types";
import { Thread } from "./Thread";

export type Loom = {
  blueprint: ThreadWithIdType;
};

export function Loom({ blueprint }: Loom) {
  return <Thread {...blueprint} />;
}
