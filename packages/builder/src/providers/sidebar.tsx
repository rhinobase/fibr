"use client";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

const SidebarContext = createContext<ReturnType<
  typeof useSidebarManager
> | null>(null);

export function SidebarProvider({ children }: PropsWithChildren) {
  const value = useSidebarManager();

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export type TabPayload = {
  name: string;
  label: ReactNode;
  icon: ReactNode;
};

function useSidebarManager() {
  const [active, setActive] = useState<string | null>(null);
  const [tabs, setTabs] = useReducer(
    (prev: Map<string, Omit<TabPayload, "name">>, cur: TabPayload) => {
      const { name, ...data } = cur;

      if (prev.size === 0) setActive(name);

      prev.set(name, data);

      return new Map(prev);
    },
    new Map(),
  );

  function addTab(data: TabPayload) {
    setTabs(data);
  }

  function onActiveChange(name: string) {
    setActive((prev) => (prev !== name ? name : null));
  }

  return { tabs, addTab, active, onActiveChange };
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Missing SidebarContext.Provider in the tree");

  return context;
}
