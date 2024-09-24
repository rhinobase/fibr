import {
  BlocksProvider,
  type BlocksStoreProps,
  Container as BuilderContainer,
  CanvasProvider,
  type CanvasStoreProps,
  useBuilder,
} from "@fibr/builder";
import { Settings } from "@fibr/shared";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";

export type Builder = BlocksStoreProps & Omit<CanvasStoreProps, "onError">;

export function Builder({ blocks, config, ...builderProps }: Builder) {
  const onError = useBuilder((state) => state.onError);

  return (
    <BlocksProvider blocks={blocks} config={config}>
      <CanvasProvider {...builderProps} onError={onError}>
        <BuilderContainer className="flex-1 overflow-y-auto">
          <Sidebar />
          <Canvas />
          <Settings />
        </BuilderContainer>
      </CanvasProvider>
    </BlocksProvider>
  );
}
