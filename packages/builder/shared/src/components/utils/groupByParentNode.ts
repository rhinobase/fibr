import type { BaseBlockType } from "@fibr/providers";

export const DEFAULT_GROUP = "__default";
export function groupByParentNode<T extends BaseBlockType>(arr: T[]) {
  return arr.reduce<Record<string, T[] | undefined>>((prev, cur) => {
    const key = cur.parentNode ?? DEFAULT_GROUP;
    if (key in prev) prev[key]?.push(cur);
    else prev[key] = [cur];

    return prev;
  }, {});
}
