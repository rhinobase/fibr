import { Container } from "./panels/Container";
import {
  type CanvasType,
  FormBuilderProvider,
  type FormBuilderStoreProps,
} from "@fibr/providers";
import { type SourceStore, SourceProvider } from "@fibr/shared";

export function WorkflowBuilder<T extends CanvasType>({
  blocks,
  config,
  ...builderProps
}: SourceStore & FormBuilderStoreProps<T>) {
  return (
    <SourceProvider blocks={blocks} config={config}>
      <FormBuilderProvider {...builderProps}>
        <Container />
      </FormBuilderProvider>
    </SourceProvider>
  );
}
