import {
  BlocksProvider,
  CanvasProvider,
  EditorShortcutsWrapper,
  useBuilder,
  type BlocksStoreProps,
  type CanvasStoreProps,
} from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
import { ShortcutsDialog } from "./ShortcutsDialog";

export type SharedWrapper = PropsWithChildren<
  BlocksStoreProps & Omit<CanvasStoreProps, "onError">
>;

export function SharedWrapper({
  children,
  blocks,
  config,
  ...canvasProviderProps
}: SharedWrapper) {
  const onError = useBuilder((state) => state.onError);

  const blockProviderProps: BlocksStoreProps = {
    blocks,
    config,
  };

  return (
    <BlocksProvider {...blockProviderProps}>
      <CanvasProvider {...canvasProviderProps} onError={onError}>
        <HotkeysProvider>
          <EditorShortcutsWrapper>{children}</EditorShortcutsWrapper>
          <ShortcutsDialog />
        </HotkeysProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
