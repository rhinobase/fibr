import {
  BlocksProvider,
  type BlocksStoreProps,
  CanvasProvider,
  type CanvasStoreProps,
  Container,
  useBuilder,
} from "@fibr/builder";
import { ReactFlowProvider } from "reactflow";
import { Canvas } from "./Canvas";
import { Settings } from "./Settings";
import { Sidebar } from "./Sidebar";
import { WorkflowDndWrapper } from "./WorkflowDndWrapper";

export type Builder = BlocksStoreProps & Omit<CanvasStoreProps, "onError">;

export function Builder({ blocks, config, ...builderProps }: Builder) {
  const onError = useBuilder((state) => state.onError);

  return (
    <BlocksProvider blocks={blocks} config={config}>
      <CanvasProvider {...builderProps} onError={onError}>
        <ReactFlowProvider>
          <WorkflowDndWrapper>
            <Container className="relative flex-1 overflow-y-auto">
              <Sidebar />
              <Canvas />
              <Settings
                style={{
                  right: 8,
                  top: 8,
                  borderRadius: 6,
                  borderLeft: 0,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  height: "calc(100% - 16px)",
                }}
              />
            </Container>
          </WorkflowDndWrapper>
        </ReactFlowProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
