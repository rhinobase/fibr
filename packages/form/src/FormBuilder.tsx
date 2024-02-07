import { Container } from "./panels";
import {
  type BasicFormType,
  FormBuilderProvider,
  type FormBuilderStoreProps,
} from "@fibr/providers";
import { type SourceStore, SourceProvider } from "@fibr/shared";

export function FormBuilder<T extends BasicFormType>({
  blocks,
  config,
  formKey,
  schema,
}: SourceStore & FormBuilderStoreProps<T>) {
  return (
    <SourceProvider blocks={blocks} config={config}>
      <FormBuilderProvider formKey={formKey} schema={schema}>
        <Container />
      </FormBuilderProvider>
    </SourceProvider>
  );
}
