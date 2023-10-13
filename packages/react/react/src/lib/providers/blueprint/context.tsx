import { ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { BlueprintStoreState, createBlueprintStore } from "./store";

const BlueprintContext = createContext<ReturnType<
  typeof createBlueprintStore
> | null>(null);

export function BlueprintProvider<T>({
  children,
  blueprint,
}: {
  children: ReactNode;
} & BlueprintStoreState<T>) {
  const store = useRef(createBlueprintStore({ blueprint })).current;

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
  if (!store) throw new Error("Missing fibr FormProvider in the tree");
  return useStore(store, selector);
}
