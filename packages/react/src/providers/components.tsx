"use client";
import React from "react";
import type { FieldProps } from "../types";

type ComponentsContext = {
  readonly components: Record<string, (props: FieldProps) => JSX.Element>;
  readonly onError?: (errors: unknown) => void;
};

const ComponentsContext = React.createContext<ComponentsContext>({
  components: {},
});

export function ComponentsProvider({
  children,
  components,
  onError,
}: { children: React.ReactNode } & ComponentsContext) {
  return (
    <ComponentsContext.Provider value={{ components, onError }}>
      {children}
    </ComponentsContext.Provider>
  );
}

export const useComponents = () => React.useContext(ComponentsContext);
