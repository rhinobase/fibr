"use client";
import { useDroppable } from "@dnd-kit/core";
import * as Tabs from "@radix-ui/react-tabs";
import {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  Panel,
  PanelGroup,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { Env, useBuilder } from "../../providers";
import { mergeRefs } from "../../utils";
import { SidebarProvider, useSidebar } from "./provider";
import { classNames } from "@rafty/ui";

const DEFAULT_SIZE = 20;
const MIN_WIDTH = 3;

export type Sidebar = HTMLAttributes<HTMLDivElement> &
  (
    | {
        isResizable: true;
        resizeHandler: ReactNode;
      }
    | { isResizable: false; resizeHandler: null }
  );

export const Sidebar = forwardRef<HTMLDivElement, Sidebar>(function Sidebar(
  { children, isResizable, resizeHandler, className, ...props },
  forwardedRef,
) {
  const panelRef = useRef<ImperativePanelHandle>(null);

  const { isProduction, defaultSize, toggle } = useBuilder(
    ({ env: { current }, setLayout, tabs: { get, active } }) => {
      const currentTab = active != null ? get(active) : undefined;

      return {
        isProduction: current === Env.PRODUCTION,
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
          "pointer-events-none absolute left-0 top-0 z-50 h-full w-full",
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
            {resizeHandler}
            <Panel order={2} defaultSize={80} />
          </PanelGroup>
        ) : (
          children
        )}
      </div>
    </SidebarProvider>
  );
});

export type SidebarContent = ComponentPropsWithoutRef<typeof Tabs.Root>;

export const SidebarContent = forwardRef<
  ElementRef<typeof Tabs.Root>,
  SidebarContent
>(function SidebarContent(
  { orientation = "vertical", ...props },
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
      ref={mergeRefs(setNodeRef, forwardedRef)}
    />
  );
});

export type SidebarList = ComponentPropsWithoutRef<typeof Tabs.List>;

export const SidebarList = forwardRef<
  ElementRef<typeof Tabs.List>,
  SidebarList
>(function SidebarList({ children, ...props }, forwardedRef) {
  const sidebarItems = useBuilder(({ tabs: { all } }) => all);

  return (
    <>
      <Tabs.List {...props} ref={forwardedRef}>
        {Object.values(sidebarItems).map(({ trigger }, index) => (
          <Fragment key={`${index}-${"sidebar"}`}>{trigger}</Fragment>
        ))}
      </Tabs.List>
      {children}
    </>
  );
});

export type SidebarTrigger = ComponentPropsWithoutRef<typeof Tabs.Trigger>;

export const SidebarTrigger = forwardRef<
  ElementRef<typeof Tabs.Trigger>,
  SidebarTrigger
>(function SidebarTrigger(props, forwardedRef) {
  const { setActiveTab } = useSidebar();

  return (
    <Tabs.Trigger
      {...props}
      onClick={setActiveTab(props.value)}
      onKeyDown={setActiveTab(props.value)}
      ref={forwardedRef}
    />
  );
});
