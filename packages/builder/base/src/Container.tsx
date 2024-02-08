import type { PropsWithChildren } from "react";
import { PanelGroup } from "react-resizable-panels";

export type Container = PropsWithChildren<{ autoSaveId?: string }>;

export function Container({ children, autoSaveId = "panel_size" }: Container) {
  return (
    <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
      {children}
    </PanelGroup>
  );
}
