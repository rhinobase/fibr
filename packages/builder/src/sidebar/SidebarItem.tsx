"use client";
import { TabContent } from "@rafty/ui";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useSidebar } from "../providers";

export type SidebarItem = PropsWithChildren<{
  name: string;
  label: ReactNode;
  icon: ReactNode;
}>;

export function SidebarItem({ children, ...props }: SidebarItem) {
  const { addTab } = useSidebar();

  // biome-ignore lint/correctness/useExhaustiveDependencies: This needs to run only on init
  useEffect(() => {
    addTab(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabContent
      value={props.name}
      className="border-secondary-200 dark:border-secondary-800 border-r"
    >
      {children}
    </TabContent>
  );
}
