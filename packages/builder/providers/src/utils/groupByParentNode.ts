import { BlockType } from "../canvas";

export const DEFAULT_GROUP = "__default";

export function groupByParentNode<T = undefined>(arr: BlockType<T>[]) {
  return arr.reduce<Record<string, BlockType<T>[] | undefined>>(
    (prev, cur) => {
      const key = cur.parentNode ?? DEFAULT_GROUP;
      if (key in prev) prev[key]?.push(cur);
      else prev[key] = [cur];

      return prev;
    },
    { [DEFAULT_GROUP]: [] },
  );
}
