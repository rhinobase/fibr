/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { ThreadWithIdType } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: As we nees a generic context
const ThreadContext = createContext<ThreadWithIdType<any> | null>(null);

export function ThreadProvider<T extends Record<string, unknown>>({
  children,
  ...values
}: PropsWithChildren<ThreadWithIdType<T>>) {
  return (
    <ThreadContext.Provider value={values}>{children}</ThreadContext.Provider>
  );
}

export function useThread<T extends Record<string, unknown>>() {
  const context = useContext<ThreadWithIdType<T> | null>(ThreadContext);

  if (!context) throw new Error("Missing ThreadContext.Provider in the tree");

  return context;
}
