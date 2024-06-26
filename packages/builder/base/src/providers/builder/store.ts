import _ from "lodash";
import { type StoreApi, type UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Env } from "../utils";

export type TabPayload = {
  name: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  isResizeable?: boolean;
  defaultSize?: number;
};

export type Layout = {
  sidebar: boolean;
  shortcutsDialog: boolean;
  commandPalette: boolean;
};

export type CreateBuilderStoreProps = {
  tabs?: Record<string, Omit<TabPayload, "name">>;
  env?: Env;
};

export type BuilderStore = {
  tabs: {
    all: Record<string, Omit<TabPayload, "name">>;
    add: (payload: TabPayload) => void;
    get: (tabId: string) => Omit<TabPayload, "name"> | undefined;
    active: string | null;
    setActive: (tabId: string | null) => void;
  };
  layout: Layout;
  setLayout: (values: Partial<Layout>) => void;
  env: {
    current: Env;
    change: (env: Env) => void;
  };
};

export const createBuilderStore = ({
  tabs = {},
  env = Env.DEVELOPMENT,
}: CreateBuilderStoreProps) =>
  create(
    immer<BuilderStore>((set, get) => ({
      tabs: {
        all: tabs,
        active: null,
        add: (payload) =>
          set((state) => {
            const { name, ...data } = payload;

            state.tabs.all[name] = data;

            const noOfTabs = Object.keys(state.tabs.all).length;

            if (noOfTabs === 1) state.tabs.active = name;
          }),
        get: (tabId) => get().tabs.all[tabId],
        setActive: (tabId) =>
          set((state) => {
            state.tabs.active = tabId;
          }),
      },
      env: {
        current: env,
        change: (env) =>
          set((state) => {
            state.env.current = env;
          }),
      },
      layout: {
        sidebar: false,
        shortcutsDialog: false,
        commandPalette: false,
      },
      setLayout: (values) =>
        set((state) => {
          state.layout = _.merge(state.layout, values);
        }),
    })),
  ) as UseBoundStore<StoreApi<BuilderStore>>;
