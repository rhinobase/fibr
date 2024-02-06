"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import { type FormBuilderStore, createFormBuilderStore } from "./store";

const FormBuilderContext = createContext<ReturnType<
  typeof createFormBuilderStore
> | null>(null);

export function FormBuilderProvider({ children }: PropsWithChildren) {
  const store = useRef(createFormBuilderStore()).current;
  return (
    <FormBuilderContext.Provider value={store}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder<T>(selector: (state: FormBuilderStore) => T): T {
  const store = useContext(FormBuilderContext);

  if (!store)
    throw new Error("Missing FormBuilderContext.Provider in the tree");

  return useStore(store, selector);
}
