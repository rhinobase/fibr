import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
} from "react";

type WeaverContextType = {
  readonly wrapper?: (props: PropsWithChildren) => ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeaverContext = createContext<WeaverContextType>({});

export type WeaverProvider = PropsWithChildren<WeaverContextType>;

export function WeaverProvider({ children, ...values }: WeaverProvider) {
  return (
    <WeaverContext.Provider value={values}>{children}</WeaverContext.Provider>
  );
}

export const useWeaver = () => useContext(WeaverContext);
