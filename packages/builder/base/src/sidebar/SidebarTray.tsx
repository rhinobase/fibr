"use client";
import { Tab, TabList, TabTrigger, classNames } from "@rafty/ui";
import { type PropsWithChildren } from "react";
import { useBuilder } from "../providers";

export type SidebarTray = PropsWithChildren<{
  expandPanel?: () => void;
  collapsePanel?: () => void;
}>;

export function SidebarTray({
  children,
  expandPanel,
  collapsePanel,
}: SidebarTray) {
  const { all, active, setActive, isExpanded } = useBuilder(
    ({ tabs: { all, active, setActive }, layout }) => ({
      all,
      active,
      setActive,
      isExpanded: layout.showSidebar,
    }),
  );

  return (
    <Tab
      value={isExpanded ? active ?? undefined : "None"}
      orientation="vertical"
      className={classNames(
        (active === null || !isExpanded) && "w-max",
        "pointer-events-auto h-full bg-white",
      )}
    >
      <TabList>
        {Array.from(all).map(([name, { icon, label }]) => (
          <TabTrigger
            key={name}
            value={name}
            title={label?.toString()}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              if (active === name && isExpanded) {
                setActive(null);
                collapsePanel?.();
              } else {
                setActive(name);
                if (!isExpanded) expandPanel?.();
              }
            }}
            className="hover:text-secondary-700 p-2"
          >
            {icon}
          </TabTrigger>
        ))}
      </TabList>
      {children}
    </Tab>
  );
}
