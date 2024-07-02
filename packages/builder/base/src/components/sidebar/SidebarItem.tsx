"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, type ComponentPropsWithoutRef } from "react";
import { useBuilder, type TabPayload } from "../../providers";

export type SidebarItem = Omit<
  ComponentPropsWithoutRef<typeof Tabs.Content>,
  "value"
> &
  TabPayload;

export function SidebarItem({
  name,
  trigger,
  isResizeable = true,
  defaultSize,
  ...props
}: SidebarItem) {
  const add = useBuilder((state) => state.tabs.add);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This needs to run only on init
  useEffect(() => {
    add({ name, trigger, isResizeable, defaultSize });
  }, []);

  return <Tabs.Content {...props} value={name} />;
}
