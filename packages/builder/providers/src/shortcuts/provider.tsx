"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useCanvas } from "../canvas";

const ShortcutsContext = createContext<ReturnType<
  typeof useShortcutsManager
> | null>(null);

export type ShortcutsProvider = PropsWithChildren;

export function ShortcutsProvider({ children }: ShortcutsProvider) {
  const value = useShortcutsManager();

  return (
    <ShortcutsContext.Provider value={value}>
      {children}
    </ShortcutsContext.Provider>
  );
}

function useShortcutsManager() {
  const { get, add, active, remove } = useCanvas(
    ({ active, block: { get, add, remove } }) => ({
      get,
      add,
      remove,
      active,
    }),
  );

  const onCopy = useCallback(
    (
      event: ClipboardEvent,
      callback?: (block: { canvas: string; block: string }) => void,
    ) => {
      if (event.clipboardData && active.canvas && active.block) {
        const block = get(active.canvas, active.block);
        if (block) {
          event.preventDefault();
          event.clipboardData.setData("text/plain", JSON.stringify(block));
          callback?.({
            canvas: active.canvas ?? "",
            block: active.block ?? "",
          });
        }
      }
    },
    [get, active],
  );

  const onPaste = useCallback(
    (event: ClipboardEvent) => {
      if (event.clipboardData) {
        const data = JSON.parse(
          event.clipboardData.getData("text/plain") ?? "",
        );
        if (data) add(active.canvas ?? "nodes", data);
      }
    },
    [add, active],
  );

  // Cut listener
  useEffect(() => {
    const onCut = (event: ClipboardEvent) =>
      onCopy(event, ({ canvas, block }) => remove(canvas, block));

    window.addEventListener("cut", onCut);

    return () => {
      window.removeEventListener("cut", onCut);
    };
  }, [onCopy, remove]);

  // Copy listener
  useEffect(() => {
    window.addEventListener("copy", onCopy);

    return () => {
      window.removeEventListener("copy", onCopy);
    };
  }, [onCopy]);

  // Paste listener
  useEffect(() => {
    window.addEventListener("paste", onPaste);

    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, [onPaste]);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (!event.ctrlKey) return;

      if (event.key === "z") console.log("Undo");
      else if (event.key === "y") console.log("Redo");
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return {};
}

export function useShortcuts() {
  const store = useContext(ShortcutsContext);

  if (!store) throw new Error("Missing ShortcutsContext.Provider in the tree");

  return store;
}
