"use client";
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
} from "react";

type FibrContextType = {
  readonly components: Record<string, () => ReactNode>;
};

const FibrContext = createContext<FibrContextType>({
  components: {},
});

type PluginType = FibrContextType["components"];

export function FibrProvider({
  children,
  plugins,
}: PropsWithChildren<{
  plugins: PluginType | PluginType[];
}>) {
  // Merging all the components
  const components = Array.isArray(plugins)
    ? Object.assign({}, ...plugins)
    : plugins;

  return (
    <FibrContext.Provider value={{ components }}>
      {children}
    </FibrContext.Provider>
  );
}

export const useFibr = () => useContext(FibrContext);
