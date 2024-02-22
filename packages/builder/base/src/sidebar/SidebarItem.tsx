"use client";
import { TabContent, classNames } from "@rafty/ui";
import {
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
} from "react";
import { TabPayload, useBuilder } from "@fibr/providers";

export type SidebarItem = Omit<TabContent, "value"> &
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
    add({ payload: { name, icon, label, isResizeable, defaultSize } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HeaderComponent = action
    ? ({ children }: PropsWithChildren) => (
        <div className="flex items-center justify-between">{children}</div>
      )
    : Fragment;

  return (
    <TabContent
      {...props}
      value={name}
      className={classNames(
        "h-full flex-col data-[state=active]:flex data-[orientation=vertical]:p-0",
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
    </TabContent>
  );
}
