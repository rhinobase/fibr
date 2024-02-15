/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export enum EditorEvent {
  ALL = "all",
  BLOCK_ID_GENERATION = "block_id_generation",
  BLOCK_ID_UPDATION = "block_id_updation",
  CANVAS_SELECTION = "canvas_selection",
  CANVAS_ADDITION = "canvas_addition",
  CANVAS_DELETION = "canvas_deletion",
  CANVAS_RESET = "canvas_reset",
  BLOCK_ADDITION = "block_addition",
  BLOCK_UPDATION = "block_updation",
  BLOCK_DELETION = "block_deletion",
  BLOCK_REPOSITION = "block_reposition",
  BLOCK_SELECTION = "block_selection",
  BLOCK_DUPLICATION = "block_duplication",
}

// TODO: Add type based functions
// biome-ignore lint/suspicious/noExplicitAny: This needs to be dynamic
export type EditorEventListener<T extends Record<string, unknown> = any> = (
  context: T,
) => Promise<void> | void;

export type EditorEventBusProps = {
  initialEvents?: Partial<Record<EditorEvent, EditorEventListener[]>>;
};

export type EditorEventBus = {
  events: Partial<Record<EditorEvent, EditorEventListener[]>>;
  add: <T extends Record<string, unknown>>(
    type: EditorEvent,
    func: EditorEventListener<T>,
  ) => void;
  remove: <T extends Record<string, unknown>>(
    type: EditorEvent,
    func: EditorEventListener<T>,
  ) => void;
  clear: (type: EditorEvent) => void;
  broadcast: <T extends Record<string, unknown>>(
    type: EditorEvent,
    context?: T,
  ) => void;
};

export const createEditorEventBus = ({
  initialEvents = {},
}: EditorEventBusProps) => {
  return create<EditorEventBus>((set, get) => ({
    events: initialEvents,
    add: (type, func) =>
      set(({ events }) => {
        if (type in events) events[type]?.push(func);
        else events[type] = [func];
        return { events: { ...events } };
      }),
    remove: (type, func) =>
      set(({ events }) => {
        const tmp = events[type];
        if (tmp) {
          const index = tmp.findIndex((event) => event === func);
          if (index !== -1) tmp.splice(index, 1);
        }

        return { events: { ...events, [type]: tmp } };
      }),
    clear: (type) =>
      set(({ events }) => ({ events: { ...events, [type]: [] } })),
    broadcast: (type, context) => {
      const events = get().events[type] ?? [];

      if (type !== EditorEvent.ALL)
        events.push(...(get().events[EditorEvent.ALL] ?? []));

      for (const event of events) {
        event({ type, ...context });
      }
    },
  }));
};
