import type { ThreadType } from "../types";

export function customThread<T extends Record<string, unknown>>(
  type: string,
): (config: T) => ThreadType<T> {
  return (config: T) => ({
    type,
    ...config,
  });
}
