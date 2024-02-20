import { create } from "zustand";
import { EditorEventListenerProps, EditorEventListener } from "../types";
import { EditorEvent } from "../utils";

export type EditorEventBusProps = {
  initialEvents?: Partial<Record<EditorEvent, EditorEventListener[]>>;
};

export type EditorEventBus = {
  events: Partial<Record<EditorEvent, EditorEventListener[]>>;
  add: <T extends EditorEvent>(
    type: T,
    func: EditorEventListener<EditorEventListenerProps[T]>,
  ) => void;
  remove: <T extends EditorEvent>(
    type: T,
    func: EditorEventListener<EditorEventListenerProps[T]>,
  ) => void;
  clear: (type?: EditorEvent) => void;
  broadcast: <T extends EditorEvent>(
    type: T,
    context?: EditorEventListenerProps[T],
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
      const events = get().events[type] ?? ([] as EditorEventListener[]);

      if (type !== EditorEvent.ALL)
        events.push(...(get().events[EditorEvent.ALL] ?? []));

      const payload = { event_type: type, ...(context ?? {}) };

      for (const event of events) {
        event(payload);
      }
    },
  }));
};
