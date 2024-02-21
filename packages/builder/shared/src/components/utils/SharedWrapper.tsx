import {
  CanvasProvider,
  CanvasStoreProps,
  ShortcutsProvider,
} from "@fibr/providers";
import { type PropsWithChildren } from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
import { BlocksProvider, BlocksStore } from "../../providers";
import { ShortcutsDialog } from "./ShortcutsDialog";

export type SharedWrapper = PropsWithChildren<BlocksStore & CanvasStoreProps>;

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
          <ShortcutsProvider>{children}</ShortcutsProvider>
          <ShortcutsDialog />
        </HotkeysProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
