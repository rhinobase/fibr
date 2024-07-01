"use client";
import { useDroppable } from "@dnd-kit/core";
import * as Tabs from "@radix-ui/react-tabs";
import {
  forwardRef,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";
import {
  Panel,
  PanelGroup,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { Env, useBuilder } from "../../providers";
import { classNames, mergeRefs } from "@rafty/ui";
import { ResizeHandle } from "./ResizeHandle";
import { SidebarProvider, useSidebar } from "./provider";

const DEFAULT_SIZE = 20;
const MIN_WIDTH = 2.4;

export type BuilderPanel = HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right";
  isResizable?: boolean;
};

export const BuilderPanel = forwardRef<HTMLDivElement, BuilderPanel>(
  function BuilderPanel(
    { className, children, isResizable = false, side, ...props },
    forwardedRef,
  ) {
    const panelRef = useRef<ImperativePanelHandle>(null);

    const { isProduction, isDisabled, defaultSize, toggle } = useBuilder(
      ({
        env: { current },
        layout: { sidebar },
        setLayout,
        tabs: { get, active },
      }) => {
        const currentTab = active != null ? get(active) : undefined;

        return {
          isProduction: current === Env.PRODUCTION,
          isDisabled: !sidebar || currentTab?.isResizeable === false,
          defaultSize: currentTab?.defaultSize ?? DEFAULT_SIZE,
          toggle: (value: boolean) => setLayout({ sidebar: value }),
        };
      },
    );

    if (isProduction) return;

    return (
      <SidebarProvider
        collapsePanel={panelRef.current?.collapse}
        expandPanel={() => panelRef.current?.resize(defaultSize)}
      >
        <div
          {...props}
          className={classNames(
            "pointer-events-none absolute top-0 z-50 h-full w-full",
            side === "left" ? "left-0" : "right-0",
            className,
          )}
          ref={forwardedRef}
        >
          {isResizable ? (
            <PanelGroup direction="horizontal">
              <Panel
                id="sidebar"
                ref={panelRef}
                order={1}
                minSize={15}
                maxSize={40}
                defaultSize={defaultSize}
                collapsible
                collapsedSize={MIN_WIDTH}
                onResize={(size) => {
                  if (size <= MIN_WIDTH) toggle(false);
                  else toggle(true);
                }}
                style={{ pointerEvents: "auto" }}
              >
                {children}
              </Panel>
              <ResizeHandle disabled={isDisabled} />
              <Panel order={2} defaultSize={80} />
            </PanelGroup>
          ) : (
            children
          )}
        </div>
      </SidebarProvider>
    );
  },
);

export type Sidebar = ComponentPropsWithoutRef<typeof Tabs.Root>;

export const Sidebar = forwardRef<ElementRef<typeof Tabs.Root>, Sidebar>(
  function Sidebar(
    { children, orientation = "vertical", className, ...props },
    forwardedRef,
  ) {
    const { collapsePanel, expandPanel } = useSidebar();
    const { setNodeRef } = useDroppable({ id: "sidebar" });

    const { active, isSidebarOpen } = useBuilder(
      ({ tabs: { active }, layout }) => ({
        active,
        isSidebarOpen: layout.sidebar,
      }),
    );

    useEffect(() => {
      if (isSidebarOpen) expandPanel?.();
      else collapsePanel?.();
    }, [isSidebarOpen, expandPanel, collapsePanel]);

    return (
      <Tabs.Root
        {...props}
        value={isSidebarOpen ? active ?? undefined : "None"}
        orientation={orientation}
        className={classNames(
          (active === null || !isSidebarOpen) && "w-max",
          "dark:bg-secondary-950 pointer-events-auto flex h-full bg-white",
          className,
        )}
        ref={mergeRefs(setNodeRef, forwardedRef)}
      />
    );
  },
);

export type SidebarList = ComponentPropsWithoutRef<typeof Tabs.List>;

export const SidebarList = forwardRef<
  ElementRef<typeof Tabs.List>,
  SidebarList
>(function SidebarList({ className, children, ...props }, forwardedRef) {
  const sidebarItems = useBuilder(({ tabs: { all } }) => all);

  return (
    <Tabs.List
      {...props}
      className={classNames(
        "dark:border-secondary-800 border-secondary-300 flex flex-col border-r",
        className,
      )}
      ref={forwardedRef}
    >
      {Object.values(sidebarItems).map(({ trigger }) => trigger)}
    </Tabs.List>
  );
});

export type SidebarTrigger = ComponentPropsWithoutRef<typeof Tabs.Trigger>;

export const SidebarTrigger = forwardRef<
  ElementRef<typeof Tabs.Trigger>,
  SidebarTrigger
>(function SidebarTrigger({ className, ...props }, forwardedRef) {
  const { setActiveTab } = useSidebar();

  return (
    <Tabs.Trigger
      {...props}
      onClick={setActiveTab(props.value)}
      onKeyDown={setActiveTab(props.value)}
      className={classNames(
        "dark:hover:text-secondary-100 text-secondary-600 dark:text-secondary-400 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 data-[state=active]:border-primary-500 dark:data-[state=active]:border-primary-300 data-[state=active]:bg-secondary-100 dark:data-[state=active]:bg-secondary-800 -mr-px rounded-l-md border-r-2 border-transparent p-2 font-medium transition-colors ease-in-out hover:text-black data-[disabled]:cursor-not-allowed data-[state=active]:text-black",
        className,
      )}
      ref={forwardedRef}
    />
  );
});
