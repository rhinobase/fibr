"use client";
import { type PropsWithChildren, createContext, useContext } from "react";

type WeaverContextType = {
  readonly wrapper?: (props: PropsWithChildren) => JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeaverContext = createContext<WeaverContextType>({});

export function WeaverProvider({
  children,
  ...values
}: PropsWithChildren<WeaverContextType>) {
  return (
    <WeaverContext.Provider value={values}>{children}</WeaverContext.Provider>
  );
}

export const useWeaver = () => useContext(WeaverContext);
