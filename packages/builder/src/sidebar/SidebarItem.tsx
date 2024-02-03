"use client";
import { TabContent } from "@rafty/ui";
import { ReactNode, useEffect } from "react";
import { useBuilder } from "../providers";

export type SidebarItem = Omit<TabContent, "value"> & {
  name: string;
  label: ReactNode;
  icon: ReactNode;
};

export function SidebarItem({ name, icon, label, ...props }: SidebarItem) {
  const add = useBuilder((state) => state.tabs.add);

  const tabProps = { name, icon, label };

  // biome-ignore lint/correctness/useExhaustiveDependencies: This needs to run only on init
  useEffect(() => {
    add(tabProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <TabContent {...props} value={tabProps.name} />;
}
