import { ReactNode, createContext, useContext, useRef } from "react";
import { ComponentsStoreState, createComponentsStore } from "./store";
import { useStore } from "zustand";

const ComponentsContext = createContext<ReturnType<
  typeof createComponentsStore
> | null>(null);

export function ComponentsProvider({
  children,
  components,
}: {
  children: ReactNode;
} & ComponentsStoreState) {
  const store = useRef(createComponentsStore({ components })).current;
  return (
    <ComponentsContext.Provider value={store}>
      {children}
    </ComponentsContext.Provider>
  );
}

export function useComponents<T>(
  selector: (state: ComponentsStoreState) => T
): T {
  const store = useContext(ComponentsContext);
  if (!store) throw new Error("Missing fibrProvider component in the tree");
  return useStore(store, selector);
}
