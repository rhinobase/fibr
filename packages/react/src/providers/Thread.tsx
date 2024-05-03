import { type PropsWithChildren, createContext, useContext } from "react";
import type { ThreadWithIdType } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: As we nees a generic context
const ThreadContext = createContext<ThreadWithIdType<any> | null>(null);

export type ThreadProvider<T extends Record<string, unknown>> =
  PropsWithChildren<ThreadWithIdType<T>>;

export function ThreadProvider<T extends Record<string, unknown>>({
  children,
  ...values
}: ThreadProvider<T>) {
  return (
    <ThreadContext.Provider value={values}>{children}</ThreadContext.Provider>
  );
}

export function useThread<T extends Record<string, unknown>>() {
  const context = useContext<ThreadWithIdType<T> | null>(ThreadContext);

  if (!context) throw new Error("Missing ThreadContext.Provider in the tree");

  return context;
}
