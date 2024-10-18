"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import {
  type EditorEventBus,
  type EditorEventBusProps,
  createEditorEventBus,
} from "./store";

const EventManagerContext = createContext<ReturnType<
  typeof createEditorEventBus
> | null>(null);

export type EventManagerProvider = PropsWithChildren<EditorEventBusProps>;

export function EventManagerProvider({
  children,
  ...props
}: EventManagerProvider) {
  const store = useRef(createEditorEventBus(props)).current;
  return (
    <EventManagerContext.Provider value={store}>
      {children}
    </EventManagerContext.Provider>
  );
}

export function useEventBus<T>(selector: (state: EditorEventBus) => T): T {
  const store = useContext(EventManagerContext);

  if (!store)
    throw new Error("Missing EventManagerContext.Provider in the tree");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useStore(store, selector);
}
