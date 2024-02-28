import {
  CanvasProvider,
  WorkspaceShortcutsWrapper,
  type CanvasStoreProps,
} from "@fibr/providers";
import type { PropsWithChildren } from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
import { BlocksProvider, type BlocksStoreProps } from "../../providers";
import { ShortcutsDialog } from "./ShortcutsDialog";

export type SharedWrapper = PropsWithChildren<
  BlocksStoreProps & CanvasStoreProps
>;

export function SharedWrapper({
  children,
  blocks,
  config,
  ...builderProps
}: SharedWrapper) {
  return (
    <BlocksProvider blocks={blocks} config={config}>
      <CanvasProvider {...builderProps}>
        <HotkeysProvider>
          <WorkspaceShortcutsWrapper>{children}</WorkspaceShortcutsWrapper>
          <ShortcutsDialog />
        </HotkeysProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
