"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { ThreadType } from "../types";

type WeaverContextType = {
  readonly blueprint: ThreadType;
  readonly wrapper?: (props: PropsWithChildren<ThreadType>) => JSX.Element;
};

const WeaverContext = createContext<WeaverContextType>({
  blueprint: { type: "default" },
});

export function WeaverProvider({
  children,
  ...values
}: PropsWithChildren<WeaverContextType>) {
  return (
    <WeaverContext.Provider value={values}>{children}</WeaverContext.Provider>
  );
}

export const useWeaver = () => useContext(WeaverContext);
