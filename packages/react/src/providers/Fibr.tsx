"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { ThreadType } from "../types";

type FibrContextType = {
  readonly components: Record<string, (props: ThreadType) => JSX.Element>;
  readonly onError?: (errors: unknown) => void;
};

const FibrContext = createContext<FibrContextType>({
  components: {},
});

type PluginType = FibrContextType["components"];

export function FibrProvider({
  children,
  plugins,
  onError,
}: PropsWithChildren<
  {
    plugins: PluginType | PluginType[];
  } & Pick<FibrContextType, "onError">
>) {
  // Merging all the components
  const components = Array.isArray(plugins)
    ? Object.assign({}, ...plugins)
    : plugins;

  return (
    <FibrContext.Provider value={{ components, onError }}>
      {children}
    </FibrContext.Provider>
  );
}

export const useFibr = () => useContext(FibrContext);
