"use client";
import { useDroppable } from "@dnd-kit/core";
import * as Tabs from "@radix-ui/react-tabs";
import { mergeRefs } from "@rafty/ui";
import {
  forwardRef,
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
import { SidebarProvider, useSidebar } from "./provider";

const DEFAULT_SIZE = 20;
const MIN_WIDTH = 2.4;

export type BuilderPanel = HTMLAttributes<HTMLDivElement> &
  (
    | {
        isResizable: true;
        resizeHandler: ReactNode;
      }
    | { isResizable: false; resizeHandler: null }
  );

export const BuilderPanel = forwardRef<HTMLDivElement, BuilderPanel>(
  function BuilderPanel(
    { children, isResizable, resizeHandler, ...props },
    forwardedRef,
  ) {
    const panelRef = useRef<ImperativePanelHandle>(null);

    const { isProduction, defaultSize, toggle } = useBuilder(
      ({
        env: { current },
        layout: { sidebar },
        setLayout,
        tabs: { get, active },
      }) => {
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
        <div {...props} ref={forwardedRef}>
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
  },
);

export type Sidebar = ComponentPropsWithoutRef<typeof Tabs.Root>;

export const Sidebar = forwardRef<ElementRef<typeof Tabs.Root>, Sidebar>(
  function Sidebar({ orientation = "vertical", ...props }, forwardedRef) {
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
  },
);

export type SidebarList = ComponentPropsWithoutRef<typeof Tabs.List>;

export const SidebarList = forwardRef<
  ElementRef<typeof Tabs.List>,
  SidebarList
>(function SidebarList({ children, ...props }, forwardedRef) {
  const sidebarItems = useBuilder(({ tabs: { all } }) => all);

  return (
    <>
      <Tabs.List {...props} ref={forwardedRef}>
        {/* TODO: resolve key error */}
        {Object.values(sidebarItems).map(({ trigger }) => trigger)}
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
