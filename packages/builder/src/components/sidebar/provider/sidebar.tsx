"use client";
import { createContext, useContext, type PropsWithChildren } from "react";
import { eventHandler } from "../../../utils";
import { useBuilder } from "../../../providers";

type SidebarProviderType = PropsWithChildren<{
  expandPanel?: () => void;
  collapsePanel?: () => void;
}>;

const SidebarContext = createContext<
  (SidebarProviderType & ReturnType<typeof useSidebarManager>) | null
>(null);

export function SidebarProvider({
  children,
  collapsePanel,
  expandPanel,
}: SidebarProviderType) {
  const { setActiveTab } = useSidebarManager({ collapsePanel, expandPanel });

  return (
    <SidebarContext.Provider
      value={{ setActiveTab, collapsePanel, expandPanel }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebarManager({
  collapsePanel,
  expandPanel,
}: Omit<SidebarProviderType, "children">) {
  const { active, setActive, isSidebarOpen } = useBuilder(
    ({ tabs: { active, setActive }, layout }) => ({
      active,
      setActive,
      isSidebarOpen: layout.sidebar,
    }),
  );

  const setActiveTab = (name: string) =>
    eventHandler(() => {
      if (active === name && isSidebarOpen) {
        setActive(null);
        collapsePanel?.();
      } else {
        setActive(name);
        if (!isSidebarOpen) expandPanel?.();
      }
    });

  return { setActiveTab };
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) throw new Error("Missing SidebarContext.Provider in the tree");

  return context;
}
