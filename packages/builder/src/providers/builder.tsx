"use client";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

export enum ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

const BuilderContext = createContext<ReturnType<
  typeof useBuilderManager
> | null>(null);

export function BuilderProvider({ children }: PropsWithChildren) {
  const value = useBuilderManager();

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}

export type TabPayload = {
  name: string;
  label: ReactNode;
  icon: ReactNode;
};

function useBuilderManager() {
  const [env, setEnv] = useState<ENV>(ENV.DEVELOPMENT);

  const [active, setActive] = useState<string>();

  const [tabs, setTabs] = useReducer(
    (prev: Map<string, Omit<TabPayload, "name">>, cur: TabPayload) => {
      const { name, ...data } = cur;

      if (prev.size === 0) setActive(name);

      prev.set(name, data);

      return new Map(prev);
    },
    new Map(),
  );

  const addTab = useCallback((data: TabPayload) => setTabs(data), []);

  const setActiveTab = useCallback((name: string) => setActive(name), []);

  const changeEnv = useCallback((env: ENV) => setEnv(env), []);

  return {
    tabs: { all: tabs, add: addTab, active, setActive: setActiveTab },
    env: {
      current: env,
      change: changeEnv,
    },
  };
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) throw new Error("Missing BuilderContext.Provider in the tree");

  return context;
}
