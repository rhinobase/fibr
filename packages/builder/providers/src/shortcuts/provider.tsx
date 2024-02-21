"use client";
import {
  createContext,
  useContext,
  type PropsWithChildren,
  useEffect,
  useCallback,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useBuilder } from "../builder";
import { EditorEvent, Env } from "../utils";
import { ActionType, useStack } from "./useStack";
import { useEventBus } from "../events";
import { useCanvas } from "../canvas";
import { EditorEventListenerProps } from "../types";

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

const EDITOR_EVENT_STACK = [
  EditorEvent.BLOCK_ADDITION,
  EditorEvent.BLOCK_UPDATION,
  EditorEvent.BLOCK_ID_UPDATION,
  EditorEvent.BLOCK_DELETION,
  EditorEvent.BLOCK_REPOSITION,
  EditorEvent.BLOCK_DUPLICATION,
  EditorEvent.SCHEMA_RESET,
];

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
  const { updateId, update, add, remove, move, set } = useCanvas(
    ({ updateId, remove, add, update, move, set }) => ({
      update,
      remove,
      move,
      add,
      updateId,
      set,
    }),
  );

  // Undo & Redo
  const resolveStackActions = useCallback(
    ({ action, data }: { action: ActionType; data: unknown }) => {
      const event_type = (data as { event_type: EditorEvent }).event_type;

      if (event_type === EditorEvent.BLOCK_ID_UPDATION) {
        const { currentBlockId, newBlockId } =
          data as EditorEventListenerProps[EditorEvent.BLOCK_ID_UPDATION];

        if (action === ActionType.UNDO)
          updateId({
            currentBlockId: newBlockId,
            newBlockId: currentBlockId,
            shouldEmit: false,
          });
        else updateId({ currentBlockId, newBlockId, shouldEmit: false });
      }

      if (event_type === EditorEvent.BLOCK_ADDITION) {
        const { blockData, blockId = "" } =
          data as EditorEventListenerProps[EditorEvent.BLOCK_ADDITION];

        if (action === ActionType.UNDO)
          remove({
            blockId,
            parentNode: blockData.parentNode,
            shouldEmit: false,
          });
        else add({ blockData, blockId, shouldEmit: false });
      }

      if (event_type === EditorEvent.BLOCK_UPDATION) {
        const { id, updatedValues, oldValues } =
          data as EditorEventListenerProps[EditorEvent.BLOCK_UPDATION];

        if (action === ActionType.UNDO)
          update({ blockId: id, updatedValues: oldValues, shouldEmit: false });
        else update({ blockId: id, updatedValues, shouldEmit: false });
      }

      if (event_type === EditorEvent.BLOCK_DELETION) {
        const { blockId, block, index } =
          data as EditorEventListenerProps[EditorEvent.BLOCK_DELETION];

        if (action === ActionType.UNDO)
          add({
            blockData: block,
            blockId,
            shouldEmit: false,
            insertionIndex: index,
          });
        else
          remove({ blockId, parentNode: block.parentNode, shouldEmit: false });
      }

      if (event_type === EditorEvent.BLOCK_REPOSITION) {
        const { sourceBlockId, targetBlockId } =
          data as EditorEventListenerProps[EditorEvent.BLOCK_REPOSITION];

        if (action === ActionType.UNDO)
          move({
            sourceBlockId: targetBlockId,
            targetBlockId: sourceBlockId,
            shouldEmit: false,
          });
        else move({ sourceBlockId, targetBlockId, shouldEmit: false });
      }

      if (event_type === EditorEvent.BLOCK_DUPLICATION) {
        const { newId, block } =
          data as EditorEventListenerProps[EditorEvent.BLOCK_DUPLICATION];

        if (action === ActionType.UNDO)
          remove({
            blockId: newId,
            parentNode: block.parentNode,
            shouldEmit: false,
          });
        else add({ blockId: newId, blockData: block, shouldEmit: false });
      }

      if (event_type === EditorEvent.SCHEMA_RESET) {
        const { prev, cur } =
          data as EditorEventListenerProps[EditorEvent.SCHEMA_RESET];

        if (action === ActionType.UNDO) set({ func: () => prev });
        else set({ func: () => cur });
      }
    },
    [add, remove, set, update, updateId, move],
  );

  const stack = useStack<unknown>(resolveStackActions);
  const addEvent = useEventBus((state) => state.add);

  useEffect(() => {
    // Actions
    for (const event of EDITOR_EVENT_STACK) {
      addEvent(event, stack.pushAction);
    }
  }, []);

  useHotkeys(
    "mod+k",
    () =>
      setLayout({
        values: {
          commandPalette: !layout.commandPalette,
        },
      }),
    {
      description: "Command palette",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+shift+a",
    () => {
      setActive({ tabId: "palette" });
      setLayout({
        values: {
          sidebar: true,
        },
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
      setActive({ tabId: "overview" });
      setLayout({
        values: {
          sidebar: true,
        },
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
      setActive({ tabId: "inspector" });
      setLayout({
        values: {
          sidebar: true,
        },
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
      setEnv({
        env: currentEnv === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT,
      }),
    {
      description: "Toggle preview mode",
    },
  );

  useHotkeys(
    "shift+?",
    () =>
      setLayout({
        values: {
          shortcutsDialog: !layout.shortcutsDialog,
        },
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

  useHotkeys("mod+g", () => console.log("Group"), {
    description: "Group",
    preventDefault: true,
  });

  useHotkeys(
    "mod+b",
    () =>
      setLayout({
        values: {
          sidebar: !layout.sidebar,
        },
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
