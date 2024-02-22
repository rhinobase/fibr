import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { EditorEventBus } from "../events";
import { EditorEvent, Env } from "../utils";
import {
  ActiveTabProps,
  AddTabProps,
  EnvChangeProps,
  GetTabProps,
  Layout,
  LayoutUpdateProps,
} from "./types";

export type TabPayload = {
  name: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  isResizeable?: boolean;
  defaultSize?: number;
};

export type CreateBuilderStoreProps = {
  tabs?: Record<string, Omit<TabPayload, "name">>;
  env?: Env;
  emitter?: EditorEventBus["broadcast"];
};

export type BuilderStore = {
  tabs: {
    all: Record<string, Omit<TabPayload, "name">>;
    add: (props: AddTabProps) => void;
    get: (props: GetTabProps) => Omit<TabPayload, "name"> | undefined;
    active: string | null;
    setActive: (props: ActiveTabProps) => void;
  };
  layout: Layout;
  setLayout: (props: LayoutUpdateProps) => void;
  env: {
    current: Env;
    change: (props: EnvChangeProps) => void;
  };
};

export const createBuilderStore = ({
  emitter = () => undefined,
  tabs = {},
  env = Env.DEVELOPMENT,
}: CreateBuilderStoreProps) =>
  create(
    immer<BuilderStore>((set, get) => ({
      tabs: {
        all: tabs,
        active: null,
        add: ({ payload }) =>
          set((state) => {
            const { name, ...data } = payload;

            state.tabs.all[name] = data;

            const noOfTabs = Object.keys(state.tabs.all).length;

            if (noOfTabs === 1) state.tabs.active = name;
            emitter(EditorEvent.ADD_TAB, payload);
          }),
        get: ({ tabId }) => get().tabs.all[tabId],
        setActive: ({ tabId }) =>
          set((state) => {
            state.tabs.active = tabId;
            emitter(EditorEvent.ACTIVE_TAB, { tabId });
          }),
      },
      env: {
        current: env,
        change: ({ env }) =>
          set((state) => {
            state.env.current = env;
            emitter(EditorEvent.ENV_CHANGE, { env });
          }),
      },
      layout: {
        sidebar: false,
        shortcutsDialog: false,
        commandPalette: false,
      },
      setLayout: ({ values }) =>
        set((state) => {
          state.layout = _.merge(state.layout, values);
          emitter(EditorEvent.LAYOUT_UPDATE, { values });
        }),
    })),
  ) as UseBoundStore<StoreApi<BuilderStore>>;
