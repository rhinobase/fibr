"use client";
import {
  createContext,
  useContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useBuilder } from "../builder";
import { EditorEvent, Env } from "../utils";
import { useStack } from "./useStack";
import { useEventBus } from "../events";

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
  // const [, copyToClipboard] = useCopyToClipboard();
  const { layout, setLayout, setActive, currentEnv, setEnv } = useBuilder(
    ({ layout, setLayout, tabs: { setActive }, env: { current, change } }) => ({
      layout,
      setLayout,
      setActive,
      currentEnv: current,
      setEnv: change,
    }),
  );
  // const { get, add, active, remove } = useCanvas(
  //   ({ active, get, add, remove }) => ({
  //     get,
  //     add,
  //     remove,
  //     active,
  //   }),
  // );

  // Undo & Redo
  const stack = useStack(console.log);
  const add = useEventBus((state) => state.add);

  useEffect(() => {
    add(EditorEvent.ALL, stack.pushAction);
  }, []);

  useHotkeys(
    "mod+k",
    () =>
      setLayout({
        commandPalette: !layout.commandPalette,
      }),
    {
      description: "Command palette",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+shift+a",
    () => {
      setActive("palette");
      setLayout({
        sidebar: true,
      });
    },
    {
      description: "Toggle palette",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+shift+d",
    () => {
      setActive("overview");
      setLayout({
        sidebar: true,
      });
    },
    {
      description: "Toggle overview",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+u",
    () => {
      setActive("inspector");
      setLayout({
        sidebar: true,
      });
    },
    {
      description: "Toggle inspector",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+alt+enter",
    () =>
      setEnv(currentEnv === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT),
    {
      description: "Toggle preview mode",
    },
  );

  useHotkeys(
    "shift+?",
    () =>
      setLayout({
        shortcutsDialog: !layout.shortcutsDialog,
      }),
    {
      description: "Shortcut dialog",
    },
    [layout.shortcutsDialog],
  );

  useHotkeys("mod+s", () => console.log("Save"), {
    description: "Save",
    preventDefault: true,
  });

  useHotkeys("mod+z", stack.undo, {
    description: "Undo",
  });

  useHotkeys("mod+y", stack.redo, {
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
        sidebar: !layout.sidebar,
      }),
    { description: "Toggle sidebar", preventDefault: true },
    [layout.sidebar],
  );

  // useHotkeys(
  //   "mod+c",
  //   (event) => {
  //     if (active.canvas && active.block) {
  //       const block = get(active.canvas, active.block);
  //       if (block) {
  //         event.preventDefault();
  //         copyToClipboard(JSON.stringify(block));
  //       }
  //     }
  //   },
  //   { description: "Copy" },
  //   [active],
  // );

  // useHotkeys(
  //   "mod+x",
  //   (event) => {
  //     if (active.canvas && active.block) {
  //       const block = get(active.canvas, active.block);
  //       if (block) {
  //         event.preventDefault();
  //         copyToClipboard(JSON.stringify(block));
  //         remove(active.canvas, active.block);
  //       }
  //     }
  //   },
  //   { description: "Cut" },
  //   [active],
  // );

  // // Paste listener
  // useEffect(() => {
  //   const onPaste = (event: ClipboardEvent) => {
  //     if (event.clipboardData) {
  //       const data = JSON.parse(
  //         event.clipboardData.getData("text/plain") ?? "",
  //       );
  //       if (data) add(active.canvas ?? "nodes", data);
  //     }
  //   };

  //   window.addEventListener("paste", onPaste);

  //   return () => {
  //     window.removeEventListener("paste", onPaste);
  //   };
  // }, [add, active]);

  return {};
}

export function useShortcuts() {
  const store = useContext(ShortcutsContext);

  if (!store) throw new Error("Missing ShortcutsContext.Provider in the tree");

  return store;
}
