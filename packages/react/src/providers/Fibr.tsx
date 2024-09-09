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

export type FibrProvider = PropsWithChildren<FibrContextType>;

export function FibrProvider({ children, components }: FibrProvider) {
  components.default ??= ComponentNotFound;

  return (
    <FibrContext.Provider value={{ components }}>
      {children}
    </FibrContext.Provider>
  );
}

export function useFibr() {
  const context = useContext(FibrContext);

  if (!context) throw new Error("Missing FibrContext.Provider in the tree");

  return context;
}
