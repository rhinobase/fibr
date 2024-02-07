"use client";
import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from "react";
import { useStore } from "zustand";
import {
  createFormBuilderStore,
  type CanvasType,
  type FormBuilderStore,
  type FormBuilderStoreProps,
} from "./store";

const FormBuilderContext = createContext<ReturnType<
  typeof createFormBuilderStore
> | null>(null);

export type FormBuilderProvider = PropsWithChildren<
  FormBuilderStoreProps<CanvasType>
>;

export function FormBuilderProvider({
  children,
  ...props
}: FormBuilderProvider) {
  const store = useRef(createFormBuilderStore(props)).current;
  return (
    <FormBuilderContext.Provider value={store}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder<T extends CanvasType, U>(
  selector: (state: FormBuilderStore<T>) => U,
): U {
  const store = useContext(FormBuilderContext);

  if (!store)
    throw new Error("Missing FormBuilderContext.Provider in the tree");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useStore(store, selector);
}
