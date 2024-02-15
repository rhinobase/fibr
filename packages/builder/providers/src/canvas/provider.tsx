"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import {
  type CanvasType,
  type CanvasStore,
  type CanvasStoreProps,
  createCanvasStore,
} from "./store";
import { useEventBus } from "../events";

const CanvasContext = createContext<ReturnType<
  typeof createCanvasStore
> | null>(null);

export type CanvasProvider = PropsWithChildren<CanvasStoreProps<CanvasType>>;

export function CanvasProvider({ children, ...props }: CanvasProvider) {
  const emitter = useEventBus((state) => state.broadcast);
  const store = useRef(createCanvasStore({ ...props, emitter })).current;
  return (
    <CanvasContext.Provider value={store}>{children}</CanvasContext.Provider>
  );
}

export function useCanvas<T extends CanvasType, U>(
  selector: (state: CanvasStore<T>) => U,
): U {
  const store = useContext(CanvasContext);

  if (!store) throw new Error("Missing CanvasContext.Provider in the tree");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useStore(store, selector);
}
