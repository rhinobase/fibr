import {
  BlocksProvider,
  CanvasProvider,
  EditorShortcutsWrapper,
  type BlocksStoreProps,
  type CanvasStoreProps,
} from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
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
          <EditorShortcutsWrapper>{children}</EditorShortcutsWrapper>
          <ShortcutsDialog />
        </HotkeysProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
