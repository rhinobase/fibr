"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import { type SourceStore, createSourceStore } from "./store";

const SourceContext = createContext<ReturnType<
  typeof createSourceStore
> | null>(null);

export function SourceProvider({
  children,
  ...props
}: PropsWithChildren<SourceStore>) {
  const store = useRef(createSourceStore(props)).current;
  return (
    <SourceContext.Provider value={store}>{children}</SourceContext.Provider>
  );
}

export function useBlocks<T>(selector: (state: SourceStore) => T): T {
  const store = useContext(SourceContext);

  if (!store) throw new Error("Missing SourceContext.Provider in the tree");

  return useStore(store, selector);
}
