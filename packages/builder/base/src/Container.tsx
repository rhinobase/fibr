import type { PropsWithChildren } from "react";
import { PanelGroup } from "react-resizable-panels";
import { useBuilder } from "./providers";

export type Container = PropsWithChildren<{ autoSaveId?: string }>;

export function Container({ children, autoSaveId = "panel_size" }: Container) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tmp = useBuilder((state) => ({
    showSidebar: state.layout.showSidebar,
    env: state.env,
  }));

  return (
    <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
      {children}
    </PanelGroup>
  );
}
