import { ThreadType } from "../types";
import { Thread } from "./Thread";

export type Loom = {
  blueprint: ThreadType;
};

export function Loom({ blueprint }: Loom) {
  return <Thread {...blueprint} />;
}
