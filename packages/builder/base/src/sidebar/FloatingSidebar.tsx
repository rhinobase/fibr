import { type PropsWithChildren } from "react";
import { Tab, TabList, TabTrigger, classNames } from "@rafty/ui";
import { useBuilder } from "@fibr/providers";

export function FloatingSidebar({ children }: PropsWithChildren) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-50 h-full w-full">
      <SidebarTray>{children}</SidebarTray>
    </div>
  );
}

function SidebarTray({ children }: PropsWithChildren) {
  const { all, active, setActive } = useBuilder(
    ({ tabs: { all, active, setActive } }) => ({
      all,
      active,
      setActive,
    }),
  );

  return (
    <Tab
      value={active === null ? "None" : active}
      orientation="vertical"
      className={classNames(
        "pointer-events-auto absolute left-0 h-full w-max items-center gap-2 p-2",
      )}
    >
      <TabList className="h-max rounded-md bg-white p-1 drop-shadow-md data-[orientation=vertical]:gap-1 data-[orientation=vertical]:rounded-t-md data-[orientation=vertical]:border-r-0">
        {Object.entries(all).map(([name, { icon, label }]) => (
          <TabTrigger
            key={name}
            value={name}
            title={label?.toString()}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (active === name) setActive(null);
              else setActive(name);
            }}
            className="hover:text-secondary-700 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 rounded p-2 data-[orientation=vertical]:border-r-0"
          >
            {icon}
          </TabTrigger>
        ))}
      </TabList>
      <div className="h-full w-full overflow-hidden rounded-md bg-white drop-shadow-md">
        {children}
      </div>
    </Tab>
  );
}
