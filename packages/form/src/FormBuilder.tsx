import { Container, Workspace } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { Canvas, Header, Settings, Sidebar } from "./panels";
import {
  BlueprintProvider,
  SourceProvider,
  useSourceManagerProps,
} from "./providers";

export function FormBuilder(props: useSourceManagerProps) {
  return (
    <SourceProvider blocks={props.blocks}>
      <FibrProvider plugins={[]}>
        <Workspace>
          <BlueprintProvider>
            <Header />
            <Container>
              <Sidebar />
              <Canvas />
              <Settings />
            </Container>
          </BlueprintProvider>
        </Workspace>
      </FibrProvider>
    </SourceProvider>
  );
}
