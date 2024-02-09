import { enableMapSet } from "immer";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Env } from "../../utils";
import _ from "lodash";

type TabPayload = {
  name: string;
  label: React.ReactNode;
  icon: React.ReactNode;
};

export type CreateBuilderStoreProps = {
  enableZooming?: boolean;
  tabs?: Map<string, Omit<TabPayload, "name">>;
  env?: Env;
};

export type Layout = {
  showSidebar: boolean;
};

export type BuilderStore = {
  config: CreateBuilderStoreProps;
  tabs: {
    all: Map<string, Omit<TabPayload, "name">>;
    add: (tab: TabPayload) => void;
    active?: string;
    setActive: (tabId: string) => void;
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
  enableZooming = false,
  tabs = new Map(),
  env = Env.DEVELOPMENT,
}: CreateBuilderStoreProps) =>
  create(
    immer<BuilderStore>((set) => ({
      config: {
        enableZooming,
      },
      tabs: {
        all: tabs,
        add: (payload) =>
          set((state) => {
            const { name, ...data } = payload;

            state.tabs.all.set(name, data);

            if (state.tabs.all.size === 1) state.tabs.active = name;
          }),
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
