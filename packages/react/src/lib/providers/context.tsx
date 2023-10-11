import { ReactNode, createContext, useContext, useRef } from "react";
import { BlueprintStoreState, createBlueprintStore } from "./store";
import { useStore } from "zustand";

const BlueprintContext = createContext<ReturnType<
  typeof createBlueprintStore
> | null>(null);

export function BlueprintProvider<T>({
  children,
  blueprint,
  components,
}: {
  children: ReactNode;
} & BlueprintStoreState<T>) {
  const store = useRef(createBlueprintStore({ blueprint, components })).current;
  return (
    <BlueprintContext.Provider value={store}>
      {children}
    </BlueprintContext.Provider>
  );
}

export function useBlueprint<T>(
  selector: (state: BlueprintStoreState<any>) => T
): T {
  const store = useContext(BlueprintContext);
  if (!store) throw new Error("Missing BlueprintContext.Provider in the tree");
  return useStore(store, selector);
}
