import { Container } from "./panels";
import { FormBuilderProvider } from "@fibr/providers";
import { TemplateDialog } from "./templates";
import { type SourceStore, SourceProvider } from "@fibr/shared";

export function FormBuilder(props: SourceStore) {
  return (
    <SourceProvider {...props}>
      <FormBuilderProvider>
        <Container />
        <TemplateDialog />
      </FormBuilderProvider>
    </SourceProvider>
  );
}
