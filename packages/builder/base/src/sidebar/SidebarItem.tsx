"use client";
import * as Tabs from "@radix-ui/react-tabs";
import {
  Fragment,
  useEffect,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { useBuilder, type TabPayload } from "../providers";
import { classNames } from "../utils";

export type SidebarItem = Omit<
  ComponentPropsWithoutRef<typeof Tabs.Content>,
  "value"
> &
  TabPayload & {
    action?: ReactNode;
  };

export function SidebarItem({
  name,
  icon,
  label,
  isResizeable = true,
  defaultSize,
  children,
  className,
  action,
  ...props
}: SidebarItem) {
  const add = useBuilder((state) => state.tabs.add);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This needs to run only on init
  useEffect(() => {
    add({ name, icon, label, isResizeable, defaultSize });
  }, []);

  const HeaderComponent = action
    ? (props: PropsWithChildren) => (
        <div className="flex items-center justify-between" {...props} />
      )
    : Fragment;

  return (
    <Tabs.Content
      {...props}
      value={name}
      className={classNames(
        "h-full w-full flex-col text-black data-[state=active]:flex dark:text-white",
        className,
      )}
    >
      <div className="space-y-3 p-3">
        <HeaderComponent>
          <h4 className="font-medium">{label}</h4>
          {action}
        </HeaderComponent>
        <hr className="dark:border-secondary-700" />
      </div>
      <div className="h-full overflow-y-auto">
        <div className="flex h-full flex-col px-3 pb-3">{children}</div>
      </div>
    </Tabs.Content>
  );
}
