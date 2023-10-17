import { ReactNode, createContext, useContext } from "react";
import { FieldProps } from "../types";

type ComponentsContext = {
  readonly components: Record<string, (props: FieldProps) => JSX.Element>;
  readonly onError?: (errors: unknown) => void;
};

const ComponentsContext = createContext<ComponentsContext>({ components: {} });

export function ComponentsProvider({
  children,
  components,
  onError,
}: { children: ReactNode } & ComponentsContext) {
  return (
    <ComponentsContext.Provider value={{ components, onError }}>
      {children}
    </ComponentsContext.Provider>
  );
}

export const useComponents = () => useContext(ComponentsContext);
