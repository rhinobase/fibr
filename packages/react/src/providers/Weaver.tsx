"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { ThreadType } from "../types";

type WeaverContextType<T extends Record<string, unknown>> = {
  readonly blueprint: ThreadType<T>;
  readonly wrapper?: (props: PropsWithChildren) => JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeaverContext = createContext<WeaverContextType<any> | null>(null);

export function WeaverProvider<T extends Record<string, unknown>>({
  children,
  ...values
}: PropsWithChildren<WeaverContextType<T>>) {
  return (
    <WeaverContext.Provider value={values}>{children}</WeaverContext.Provider>
  );
}

export function useWeaver() {
  const context = useContext(WeaverContext);

  if (!context) throw new Error("Missing WeaverContext.Provider in the tree");

  return context;
}
