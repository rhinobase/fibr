"use client";
import { PropsWithChildren, createContext, useContext } from "react";
import type { RenderField } from "../RenderField";

type FibrContextType = {
  readonly components: Record<string, (props: RenderField) => JSX.Element>;
  readonly onError?: (errors: unknown) => void;
};

const FibrContext = createContext<FibrContextType>({
  components: {},
});

export function FibrProvider({
  children,
  plugins,
  onError,
}: PropsWithChildren<
  { plugins: FibrContextType["components"][] } & Pick<
    FibrContextType,
    "onError"
  >
>) {
  // Merging all the components
  const components = Object.assign({}, ...plugins);

  return (
    <FibrContext.Provider value={{ components, onError }}>
      {children}
    </FibrContext.Provider>
  );
}

export const useFibr = () => useContext(FibrContext);
