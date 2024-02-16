import {
  CanvasProvider,
  CanvasStoreProps,
  CanvasType,
  ShortcutsProvider,
} from "@fibr/providers";
import { PropsWithChildren } from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
import { BlocksProvider, BlocksStore } from "../../providers";
import { ShortcutsDialog } from "./ShortcutsDialog";

export type SharedWrapper<T extends CanvasType> = PropsWithChildren<
  BlocksStore & CanvasStoreProps<T>
>;

export function SharedWrapper<T extends CanvasType>({
  children,
  blocks,
  config,
  ...builderProps
}: SharedWrapper<T>) {
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
