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
  }, []);

  return <TabContent value={props.name}>{children}</TabContent>;
}
