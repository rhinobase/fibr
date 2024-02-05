import { Container } from "./panels";
import { BlueprintProvider } from "./providers";
import { TemplateDialog } from "./templates";
import { type SourceStore, SourceProvider } from "@fibr/shared";

export function FormBuilder(props: SourceStore) {
  return (
    <SourceProvider {...props}>
      <BlueprintProvider>
        <Container />
        <TemplateDialog />
      </BlueprintProvider>
    </SourceProvider>
  );
}
