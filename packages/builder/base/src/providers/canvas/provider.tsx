"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import { useEventBus } from "../events";
import {
  type CanvasStore,
  type CanvasStoreProps,
  createCanvasStore,
} from "./store";
import { useBuilder } from "../builder";

const CanvasContext = createContext<ReturnType<
  typeof createCanvasStore
> | null>(null);

export type CanvasProvider = PropsWithChildren<CanvasStoreProps>;

export function CanvasProvider({ children, ...props }: CanvasProvider) {
  const emitter = useEventBus((state) => state.broadcast);
  const onError = useBuilder((state) => state.onError);

  const store = useRef(
    createCanvasStore({ ...props, emitter, onError }),
  ).current;
  return (
    <CanvasContext.Provider value={store}>{children}</CanvasContext.Provider>
  );
}

export function useCanvas<T>(selector: (state: CanvasStore) => T): T {
  const store = useContext(CanvasContext);

  if (!store) throw new Error("Missing CanvasContext.Provider in the tree");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useStore(store, selector);
}
