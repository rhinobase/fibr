import { Tab, TabList, TabTrigger } from "@rafty/ui";
import { PropsWithChildren, ReactNode, useId } from "react";

export type Sidebar = PropsWithChildren<{
  options: {
    label: string;
    icon: ReactNode;
  }[];
}>;

export function Sidebar({ options, children }: Sidebar) {
  const key = useId();
  return (
    <div className="flex h-full w-80 items-center justify-center">
      <Tab
        defaultValue="palette"
        orientation="vertical"
        className="h-full w-full"
      >
        <TabList>
          {options.map(({ label, icon }, index) => (
            <TabTrigger
              key={`${key}-${index}`}
              value={label}
              className="ring-secondary-400 dark:ring-offset-secondary-950 !rounded !border-0 !p-1.5 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2"
            >
              {icon}
            </TabTrigger>
          ))}
        </TabList>
        {children}
      </Tab>
    </div>
  );
}
