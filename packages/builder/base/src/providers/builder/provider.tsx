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

export function BuilderProvider({
  children,
  ...props
}: PropsWithChildren<BuilderStoreProps>) {
  const store = useRef(createBuilderStore({ ...props })).current;
  return (
    <BuilderContext.Provider value={store}>{children}</BuilderContext.Provider>
  );
}

export function useBuilder<T>(
  selector: (state: BuilderStore & Pick<BuilderStoreProps, "onError">) => T,
): T {
  const store = useContext(BuilderContext);

  if (!store) throw new Error("Missing BuilderContext.Provider in the tree");

  return useStore(store, selector);
}
