import { ReactNode, createContext, useContext } from "react";
import { FieldProps } from "../types";

type ComponentsContext = {
  readonly components: Record<string, (props: FieldProps) => JSX.Element>;
};

const ComponentsContext = createContext<ComponentsContext>({ components: {} });

export function ComponentsProvider({
  children,
  components,
}: { children: ReactNode } & ComponentsContext) {
  return (
    <ComponentsContext.Provider value={{ components }}>
      {children}
    </ComponentsContext.Provider>
  );
}

export const useComponents = () => useContext(ComponentsContext);
