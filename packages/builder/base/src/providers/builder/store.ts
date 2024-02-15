import { enableMapSet } from "immer";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Env } from "../../utils";
import _ from "lodash";

export type TabPayload = {
  name: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  isResizeable?: boolean;
  defaultSize?: number;
};

export type CreateBuilderStoreProps = {
  tabs?: Map<string, Omit<TabPayload, "name">>;
  env?: Env;
};

export type Layout = {
  showSidebar: boolean;
};

export type BuilderStore = {
  tabs: {
    all: Map<string, Omit<TabPayload, "name">>;
    add: (tab: TabPayload) => void;
    get: (tab: string) => Omit<TabPayload, "name"> | undefined;
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

enableMapSet();
export const createBuilderStore = ({
  tabs = new Map(),
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

            state.tabs.all.set(name, data);

            if (state.tabs.all.size === 1) state.tabs.active = name;
          }),
        get: (tabId) => get().tabs.all.get(tabId),
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
        showSidebar: false,
      },
      setLayout: (values) =>
        set((state) => {
          state.layout = _.merge(state.layout, values);
        }),
    })),
  ) as UseBoundStore<StoreApi<BuilderStore>>;
