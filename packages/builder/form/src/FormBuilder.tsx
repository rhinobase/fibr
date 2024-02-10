import {
  type CanvasType,
  FormBuilderProvider,
  type FormBuilderStoreProps,
} from "@fibr/providers";
import { SourceProvider, type SourceStore } from "@fibr/shared";
import { Container } from "./Container";

export function FormBuilder<T extends CanvasType>({
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
