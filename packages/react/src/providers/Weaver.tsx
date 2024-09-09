import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
} from "react";

export type WeaverContextType = {
  readonly wrapper: (props: PropsWithChildren) => ReactNode;
};

const WeaverContext = createContext<WeaverContextType | null>(null);

export type WeaverProvider = PropsWithChildren<WeaverContextType>;

export function WeaverProvider({ children, ...values }: WeaverProvider) {
  return (
    <WeaverContext.Provider value={values}>{children}</WeaverContext.Provider>
  );
}

export const useWeaver = () => useContext(WeaverContext);
