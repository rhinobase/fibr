import {
  BlocksProvider,
  type BlocksStoreProps,
  CanvasProvider,
  type CanvasStoreProps,
  Container,
} from "@fibr/builder";
import { ReactFlowProvider } from "reactflow";
import { Canvas } from "./Canvas";
import { Settings } from "./Settings";
import { Sidebar } from "./Sidebar";
import { WorkflowDndWrapper } from "./WorkflowDndWrapper";

export type Builder = BlocksStoreProps & CanvasStoreProps;

export function Builder({ blocks, config, ...builderProps }: Builder) {
  return (
    <BlocksProvider blocks={blocks} config={config}>
      <CanvasProvider {...builderProps}>
        <ReactFlowProvider>
          <WorkflowDndWrapper>
            <Container>
              <Sidebar />
              <Canvas />
              <Settings className="right-2 top-2 h-[calc(100%-16px)] rounded-md border-l-0 shadow-md" />
            </Container>
          </WorkflowDndWrapper>
        </ReactFlowProvider>
      </CanvasProvider>
    </BlocksProvider>
  );
}
