"use client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useCanvas } from "../canvas";
import { useHotkeys } from "react-hotkeys-hook";
import { useBuilder } from "../builder";
import { useCopyToClipboard } from "@uidotdev/usehooks";

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
  const [, copyToClipboard] = useCopyToClipboard();
  const { layout, setLayout } = useBuilder(({ layout, setLayout }) => ({
    layout,
    setLayout,
  }));
  const { get, add, active, remove } = useCanvas(
    ({ active, block: { get, add, remove } }) => ({
      get,
      add,
      remove,
      active,
    }),
  );

  useHotkeys("mod+k", () => console.log("Command palette"), {
    description: "Command palette",
    preventDefault: true,
  });

  useHotkeys("mod+shift+a", () => console.log("Toggle palette"), {
    description: "Toggle palette",
    preventDefault: true,
  });

  useHotkeys("mod+shift+d", () => console.log("Toggle overview"), {
    description: "Toggle overview",
    preventDefault: true,
  });

  useHotkeys("mod+u", () => console.log("Toggle inspector"), {
    description: "Toggle inspector",
    preventDefault: true,
  });

  useHotkeys("mod+alt+enter", () => console.log("Toggle preview mode"), {
    description: "Toggle preview mode",
  });

  useHotkeys("shift+?", () => console.log("Shortcut dialog"), {
    description: "Shortcut dialog",
  });

  useHotkeys("mod+s", () => console.log("Save"), {
    description: "Save",
    preventDefault: true,
  });

  useHotkeys("mod+z", () => console.log("Undo"), {
    description: "Undo",
  });

  useHotkeys("mod+y", () => console.log("Redo"), {
    description: "Redo",
  });

  useHotkeys("mod+a", () => console.log("Select all"), {
    description: "Select all",
    preventDefault: true,
  });

  useHotkeys("mod+d", () => console.log("Duplicate"), {
    description: "Duplicate",
    preventDefault: true,
  });

  useHotkeys(
    "mod+b",
    () =>
      setLayout({
        showSidebar: !layout.showSidebar,
      }),
    { description: "Toggle sidebar", preventDefault: true },
    [layout.showSidebar],
  );

  useHotkeys(
    "mod+c",
    (event) => {
      if (active.canvas && active.block) {
        const block = get(active.canvas, active.block);
        if (block) {
          event.preventDefault();
          copyToClipboard(JSON.stringify(block));
        }
      }
    },
    { description: "Copy" },
    [active],
  );

  useHotkeys(
    "mod+x",
    (event) => {
      if (active.canvas && active.block) {
        const block = get(active.canvas, active.block);
        if (block) {
          event.preventDefault();
          copyToClipboard(JSON.stringify(block));
          remove(active.canvas, active.block);
        }
      }
    },
    { description: "Cut" },
    [active],
  );

  // Paste listener
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      if (event.clipboardData) {
        const data = JSON.parse(
          event.clipboardData.getData("text/plain") ?? "",
        );
        if (data) add(active.canvas ?? "nodes", data);
      }
    };

    window.addEventListener("paste", onPaste);

    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, [add, active]);

  return {};
}

export function useShortcuts() {
  const store = useContext(ShortcutsContext);

  if (!store) throw new Error("Missing ShortcutsContext.Provider in the tree");

  return store;
}
