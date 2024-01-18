"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { ThreadType } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThreadContext = createContext<ThreadType<any> | null>(null);

export function ThreadProvider<T extends Record<string, unknown>>({
  children,
  ...values
}: PropsWithChildren<ThreadType<T>>) {
  return (
    <ThreadContext.Provider value={values}>{children}</ThreadContext.Provider>
  );
}

export function useThread<T extends Record<string, unknown>>() {
  const context = useContext<ThreadType<T> | null>(ThreadContext);

  if (!context) throw new Error("Missing ThreadContext.Provider in the tree");

  return context;
}
