"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import {
  type BuilderStore,
  type BuilderStoreProps,
  createBuilderStore,
} from "./store";

const BuilderContext = createContext<ReturnType<
  typeof createBuilderStore
> | null>(null);

export type BuilderProvider = PropsWithChildren<BuilderStoreProps>;

export function BuilderProvider({ children, ...props }: BuilderProvider) {
  const store = useRef(createBuilderStore({ ...props })).current;
  return (
    <BuilderContext.Provider value={store}>{children}</BuilderContext.Provider>
  );
}

export function useBuilder<T>(selector: (state: BuilderStore) => T): T {
  const store = useContext(BuilderContext);

  if (!store) throw new Error("Missing BuilderContext.Provider in the tree");

  return useStore(store, selector);
}
