import { create } from "zustand";
import type { BlockType } from "../canvas";
import { EditorEvent } from "../utils";

export type EventContext = {
  event_type: EditorEvent;
  prev?: BlockType[];
  cur?: BlockType[];
};
export type EditorEventListener = (
  context: EventContext,
) => Promise<void> | void;

export type EditorEventBusProps = {
  initialEvents?: Partial<Record<EditorEvent, EditorEventListener[]>>;
};

export type EditorEventBus = {
  events: Partial<Record<EditorEvent, EditorEventListener[]>>;
  add: (type: EditorEvent, func: EditorEventListener) => void;
  remove: (type: EditorEvent, func: EditorEventListener) => void;
  clear: (type?: EditorEvent) => void;
  broadcast: (
    type: EditorEvent,
    context?: Omit<EventContext, "event_type">,
  ) => void;
};

export const createEditorEventBus = ({
  initialEvents = {},
}: EditorEventBusProps) => {
  return create<EditorEventBus>((set, get) => ({
    events: initialEvents,
    add: (type, func) =>
      set(({ events }) => {
        const eventHandler = [func] as EditorEventListener[];

        if (type in events) events[type]?.push(...eventHandler);
        else events[type] = eventHandler;
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
      set(({ events }) =>
        type ? { events: { ...events, [type]: [] } } : { events: {} },
      ),
    broadcast: (type, context) => {
      const events = [...(get().events[type] ?? ([] as EditorEventListener[]))];

      if (type !== EditorEvent.ALL)
        events.push(...(get().events[EditorEvent.ALL] ?? []));

      const payload = { event_type: type, ...(context ?? {}) };

      for (const event of events) {
        event(payload);
      }
    },
  }));
};
