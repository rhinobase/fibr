import {
  type CanvasType,
  CanvasProvider,
  type CanvasStoreProps,
  ShortcutsProvider,
} from "@fibr/providers";
import { BlocksProvider, type BlocksStore } from "@fibr/shared";
import { Container } from "./Container";
import { ReactFlowProvider } from "reactflow";

export function PageBuilder<T extends CanvasType>({
  blocks,
  config,
  ...builderProps
}: BlocksStore & CanvasStoreProps<T>) {
  return (
    <BlocksProvider blocks={blocks} config={config}>
      <CanvasProvider {...builderProps}>
        <ReactFlowProvider>
          <ShortcutsProvider>
            <Container />
          </ShortcutsProvider>
        </ReactFlowProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
