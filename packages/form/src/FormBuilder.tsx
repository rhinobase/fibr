import { Container, Workspace } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { Canvas, Header, Settings, Sidebar } from "./panels";
import { BlueprintProvider } from "./providers";

export function FormBuilder() {
  return (
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
  );
}
