"use client";
import { Toast } from "@rafty/ui";
import { useCallback, useEffect, type PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { useHotkeys } from "react-hotkeys-hook";
import { useCanvas } from "../../canvas";
import { EventContext, useEventBus } from "../../events";
import { EditorEvent } from "../../utils";
import { ActionType, useStack } from "../useStack";
import { useCopyToClipboard } from "@uidotdev/usehooks";

export function ShortcutsWrapper({ children }: PropsWithChildren) {
  const [, copyToClipboard] = useCopyToClipboard();
  const { schema, select, remove, set } = useCanvas(
    ({ schema, select, set, remove }) => ({
      schema,
      select,
      set,
      remove,
    }),
  );

  // Undo & Redo
  const resolveStackActions = useCallback(
    ({
      action,
      data: { prev, cur },
    }: {
      action: ActionType;
      data: EventContext;
    }) => {
      if (action === ActionType.UNDO)
        set({ func: () => prev ?? [], shouldEmit: false });
      else set({ func: () => cur ?? [], shouldEmit: false });
    },
    [set],
  );

  const stack = useStack<EventContext>(resolveStackActions);
  const addEvent = useEventBus((state) => state.add);

  useEffect(() => {
    // Actions
    addEvent(EditorEvent.ALL, stack.pushAction);
  }, []);

  useHotkeys(
    "mod+z",
    () => {
      toast.custom((t) => (
        <Toast title="Undo!" severity="success" visible={t.visible} />
      ));

      stack.undo();
    },
    {
      description: "Undo",
    },
  );

  useHotkeys(
    "mod+y",
    () => {
      toast.custom((t) => (
        <Toast title="Redo!" severity="success" visible={t.visible} />
      ));

      stack.redo();
    },
    {
      description: "Redo",
      preventDefault: true,
    },
  );

  useHotkeys("mod+g", () => console.log("Group"), {
    description: "Group",
    preventDefault: true,
  });

  useHotkeys(
    "mod+a",
    () =>
      select({
        selectedBlockIds: schema.map(({ id }) => id),
      }),
    {
      description: "Select All",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+d",
    () =>
      select({
        selectedBlockIds: null,
      }),
    {
      description: "Deselect All",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+c",
    () => {
      const selected = schema.filter(({ selected }) => selected);
      if (selected.length > 0) copyToClipboard(JSON.stringify(selected));
    },
    { description: "Copy", preventDefault: true },
    [schema],
  );

  useHotkeys(
    "mod+x",
    () => {
      const selected = schema.filter(({ selected }) => selected);
      if (selected.length > 0) {
        copyToClipboard(JSON.stringify(selected));
        remove({ blockIds: selected.map(({ id }) => id) });
      }
    },
    { description: "Cut" },
    [schema],
  );

  // Paste listener
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      if (event.clipboardData) {
        const data = JSON.parse(
          event.clipboardData.getData("text/plain") ?? "",
        );
        console.log(data);
        // if (data) add(active.canvas ?? "nodes", data);
      }
    };

    window.addEventListener("paste", onPaste);

    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, []);

  return children;
}
