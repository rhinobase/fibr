import {
  type CanvasType,
  CanvasProvider,
  type CanvasStoreProps,
  ShortcutsProvider,
} from "@fibr/providers";
import { BlocksProvider, type BlocksStore } from "@fibr/shared";
import { Container } from "./Container";

export function FormBuilder<T extends CanvasType>({
  blocks,
  config,
  ...builderProps
}: BlocksStore & CanvasStoreProps<T>) {
  return (
    <BlocksProvider blocks={blocks} config={config}>
      <CanvasProvider {...builderProps}>
        <ShortcutsProvider>
          <Container />
        </ShortcutsProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
