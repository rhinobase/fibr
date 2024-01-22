"use client";
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
} from "react";
import { ComponentNotFound } from "../components";

type FibrContextType = {
  readonly components: Record<string, () => ReactNode>;
};

const FibrContext = createContext<FibrContextType | null>(null);

type PluginType = FibrContextType["components"];

export function FibrProvider({
  children,
  plugins,
}: PropsWithChildren<{
  plugins: PluginType | PluginType[];
}>) {
  // Merging all the components
  const components = Array.isArray(plugins)
    ? Object.assign({ default: ComponentNotFound }, ...plugins)
    : plugins;

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
