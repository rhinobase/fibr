"use client";
import { type PropsWithChildren, useCallback, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useCanvas } from "../../../canvas";
import { type EventContext, useEventBus } from "../../../events";
import { EditorEvent } from "../../../utils";
import { ActionType, useStack } from "./useStack";

export function CanvasShortcutsWrapper(props: PropsWithChildren) {
  const { schema, select, set } = useCanvas(({ schema, select, set }) => ({
    schema,
    select,
    set,
  }));

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Actions
    addEvent(EditorEvent.ALL, stack.pushAction);
  }, []);

  useHotkeys(
    "mod+z",
    () => {
      // toast.custom((t) => (
      //   <Toast title="Undo!" severity="success" visible={t.visible} />
      // ));

      stack.undo();
    },
    {
      description: "Undo",
    },
  );

  useHotkeys(
    "mod+y",
    () => {
      // toast.custom((t) => (
      //   <Toast title="Redo!" severity="success" visible={t.visible} />
      // ));

      stack.redo();
    },
    {
      description: "Redo",
      preventDefault: true,
    },
  );

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

  //TODO: complete this

  // useHotkeys(
  //   "mod+c",
  //   () => {
  //     const selected = schema.filter(({ selected }) => selected);
  //     if (selected.length > 0) copyToClipboard(JSON.stringify(selected));
  //   },
  //   { description: "Copy", preventDefault: true },
  //   [schema],
  // );

  // useHotkeys(
  //   "mod+x",
  //   () => {
  //     const selected = schema.filter(({ selected }) => selected);
  //     if (selected.length > 0) {
  //       copyToClipboard(JSON.stringify(selected));
  //       remove({ blockIds: selected.map(({ id }) => id) });
  //     }
  //   },
  //   { description: "Cut" },
  //   [schema],
  // );

  // Paste listener
  // useEffect(() => {
  //   const onPaste = (event: ClipboardEvent) => {
  //     if (event.clipboardData) {
  //       const data = JSON.parse(
  //         event.clipboardData.getData("text/plain") ?? "",
  //       );
  //       console.log(data);
  //       // if (data) add(active.canvas ?? "nodes", data);
  //     }
  //   };

  //   window.addEventListener("paste", onPaste);

  //   return () => {
  //     window.removeEventListener("paste", onPaste);
  //   };
  // }, []);

  return props.children;
}
