"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import { type BlueprintStore, createBlueprintStore } from "../store";

const BlueprintContext = createContext<ReturnType<
  typeof createBlueprintStore
> | null>(null);

export function BlueprintProvider({ children }: PropsWithChildren) {
  const store = useRef(createBlueprintStore()).current;
  return (
    <BlueprintContext.Provider value={store}>
      {children}
    </BlueprintContext.Provider>
  );
}

export function useBlueprint<T>(selector: (state: BlueprintStore) => T): T {
  const store = useContext(BlueprintContext);

  if (!store) throw new Error("Missing BlueprintContext.Provider in the tree");

  return useStore(store, selector);
}
