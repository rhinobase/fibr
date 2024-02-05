import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Env } from "../../utils";
import { enableMapSet } from "immer";

type TabPayload = {
  name: string;
  label: React.ReactNode;
  icon: React.ReactNode;
};

export type CreateBuilderStoreProps = {
  enableZooming?: boolean;
};

export type BuilderStore = {
  config: CreateBuilderStoreProps;
  tabs: {
    all: Map<string, Omit<TabPayload, "name">>;
    add: (tab: TabPayload) => void;
    active?: string;
    setActive: (tabId: string) => void;
  };
  env: {
    current: Env;
    change: (env: Env) => void;
  };
};

enableMapSet();
export const createBuilderStore = (props: CreateBuilderStoreProps) =>
  create(
    immer<BuilderStore>((set) => ({
      config: props,
      tabs: {
        all: new Map(),
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
        current: Env.DEVELOPMENT,
        change: (env) =>
          set((state) => {
            state.env.current = env;
          }),
      },
    })),
  ) as UseBoundStore<StoreApi<BuilderStore>>;
