"use client";
import { TabContent, classNames } from "@rafty/ui";
import { type ReactNode, useEffect, PropsWithChildren, Fragment } from "react";
import { useBuilder } from "../providers";

export type SidebarItem = Omit<TabContent, "value"> & {
  name: string;
  label: ReactNode;
  icon: ReactNode;
  action?: ReactNode;
};

export function SidebarItem({
  name,
  icon,
  label,
  children,
  className,
  action,
  ...props
}: SidebarItem) {
  const add = useBuilder((state) => state.tabs.add);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This needs to run only on init
  useEffect(() => {
    add({ name, icon, label });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = action
    ? ({ children }: PropsWithChildren) => (
        <div className="flex items-center justify-between">{children}</div>
      )
    : Fragment;

  return (
    <TabContent
      {...props}
      value={name}
      className={classNames(
        "flex-col overflow-hidden data-[state=active]:flex data-[orientation=vertical]:p-0",
        className,
      )}
    >
      <div className="space-y-3 p-3">
        <Component>
          <h4 className="font-medium">{label}</h4>
          {action}
        </Component>
        <hr />
      </div>
      <div className="h-full overflow-y-auto">
        <div className="flex h-full flex-col gap-3 px-3 pb-3">{children}</div>
      </div>
    </TabContent>
  );
}
