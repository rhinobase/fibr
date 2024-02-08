import {
  type CanvasType,
  FormBuilderProvider,
  type FormBuilderStoreProps,
} from "@fibr/providers";
import { SourceProvider, type SourceStore } from "@fibr/shared";
import { Container } from "./panels/Container";
import { ReactFlowProvider } from "reactflow";

export function WorkflowBuilder<T extends CanvasType>({
  blocks,
  config,
  ...builderProps
}: SourceStore & FormBuilderStoreProps<T>) {
  return (
    <SourceProvider blocks={blocks} config={config}>
      <FormBuilderProvider {...builderProps}>
        <ReactFlowProvider>
          <Container />
        </ReactFlowProvider>
      </FormBuilderProvider>
    </SourceProvider>
  );
}
