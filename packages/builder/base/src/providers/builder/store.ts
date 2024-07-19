import _ from "lodash";
import { type StoreApi, type UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Env } from "../utils";

export enum WorkspaceErrorType {
  BLOCK_NOT_FOUND = "blockNotFound",
  ID_ALREADY_EXIST = "idAlreadyExist",
  ID_NOT_FOUND = "idNotFound",
  GROUP_NOT_VALID = "groupNotValid",
  SCHEMA_NOT_VALID = "schemaNotValid",
}

export type TabPayload = {
  name: string;
  trigger: React.ReactNode;
  isResizeable?: boolean;
  defaultSize?: number;
};

export type Layout = {
  sidebar: boolean;
  shortcutsDialog: boolean;
  commandPalette: boolean;
};

type ErrorOptionsType = { cause?: Error } & (
  | {
      type:
        | WorkspaceErrorType.BLOCK_NOT_FOUND
        | WorkspaceErrorType.GROUP_NOT_VALID
        | WorkspaceErrorType.SCHEMA_NOT_VALID;
      data?: null;
    }
  | {
      type:
        | WorkspaceErrorType.ID_ALREADY_EXIST
        | WorkspaceErrorType.ID_NOT_FOUND;
      data?: {
        id: string | string[];
      };
    }
);

export type BuilderStoreProps = Partial<Omit<BuilderStore, "tabs" | "env">> & {
  tabs?: Partial<BuilderStoreTabs>;
  env?: Partial<BuilderStoreEnv>;
};

export type BuilderStore = {
  tabs: BuilderStoreTabs;
  layout: Layout;
  setLayout: (values: Partial<Layout>) => void;
  env: BuilderStoreEnv;
  onError: (options: ErrorOptionsType) => void;
};

export type BuilderStoreTabs = {
  all: Record<string, Omit<TabPayload, "name">>;
  add: (payload: TabPayload) => void;
  get: (tabId: string) => Omit<TabPayload, "name"> | undefined;
  active: string | null;
  setActive: (tabId: string | null) => void;
};

export type BuilderStoreEnv = {
  current: Env;
  change: (env: Env) => void;
};

export const createBuilderStore = (props: BuilderStoreProps) => {
  const {
    tabs,
    env,
    onError = console.error,
    layout = {
      sidebar: false,
      shortcutsDialog: false,
      commandPalette: false,
    },
    setLayout,
  } = props;

  return create(
    immer<BuilderStore>((set, get) => ({
      tabs: {
        all: tabs?.all ?? {},
        active: tabs?.active ?? null,
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
        current: env?.current ?? Env.DEVELOPMENT,
        change: (e) =>
          set((state) => {
            state.env.current = e;
          }),
      },
      layout,
      setLayout: (values) =>
        set((state) => {
          state.layout = _.merge(state.layout, values);
        }),
      onError,
    })),
  ) as UseBoundStore<StoreApi<BuilderStore>>;
};
