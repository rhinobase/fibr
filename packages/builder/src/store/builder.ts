import { create } from "zustand";
import { Env } from "../utils";

type TabPayload = {
  name: string;
  label: React.ReactNode;
  icon: React.ReactNode;
};

export type CreateBuilderStoreProps = {
  enableZooming?: boolean;
};

export type BuilderStoreState = {
  config: CreateBuilderStoreProps;
  _tabs: Map<string, Omit<TabPayload, "name">>;
  _active?: string;
  _env: Env;
};

export type BuilderStoreActions = {
  tabs: {
    all: () => Map<string, Omit<TabPayload, "name">>;
    add: (tab: TabPayload) => void;
    active: () => string | undefined;
    setActive: (tabId: string) => void;
  };
  env: {
    current: () => Env;
    change: (env: Env) => void;
  };
};

export const createBuilderStore = (props: CreateBuilderStoreProps) => {
  return create<BuilderStoreState & BuilderStoreActions>((set, get) => ({
    config: props,
    _tabs: new Map(),
    _env: Env.DEVELOPMENT,
    tabs: {
      all: () => get()._tabs,
      add: (payload) =>
        set(({ _tabs }) => {
          const { name, ...data } = payload;

          _tabs.set(name, data);

          if (_tabs.size === 0) return { _tabs, _active: name };

          return { _tabs };
        }),
      active: () => get()._active,
      setActive: (tabId) => set({ _active: tabId }),
    },
    env: { current: () => get()._env, change: (env) => set({ _env: env }) },
  }));
};
