import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
} from "react";
import { ComponentNotFound } from "../components/ComponentNotFound";

type FibrContextType = {
  readonly components: Record<string, () => ReactNode>;
};

const FibrContext = createContext<FibrContextType | null>(null);

type PluginType = FibrContextType["components"];

export type FibrProvider = PropsWithChildren<{
  components: PluginType;
}>;

export function FibrProvider({ children, components }: FibrProvider) {
  return (
    <FibrContext.Provider
      value={{ components: { default: ComponentNotFound, ...components } }}
    >
      {children}
    </FibrContext.Provider>
  );
}

export function useFibr() {
  const context = useContext(FibrContext);

  if (!context) throw new Error("Missing FibrContext.Provider in the tree");

  return context;
}
