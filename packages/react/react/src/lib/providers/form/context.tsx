import { ReactNode, createContext, useContext, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
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

  // Adding provider for forms
  const methods = useForm({
    resolver: blueprint.validation,
    defaultValues: blueprint.default_values,
  });

  return (
    <BlueprintContext.Provider value={store}>
      <FormProvider {...methods}>{children}</FormProvider>
    </BlueprintContext.Provider>
  );
}

export function useBlueprint<T>(
  selector: (state: BlueprintStoreState<any>) => T
): T {
  const store = useContext(BlueprintContext);
  if (!store) throw new Error("Missing Fiber FormProvider in the tree");
  return useStore(store, selector);
}
