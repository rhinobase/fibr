import { Container, Sidebar, Workspace } from "@fibr/builder";
import { Canvas, Overview, Palette, Settings, Header } from "./panels";
import { BlueprintProvider } from "./providers";
import { FibrProvider } from "@fibr/react";

export function FormBuilder() {
  return (
    <BlueprintProvider>
      <FibrProvider plugins={[]}>
        <Workspace>
          <Header />
          <Container>
            <Sidebar>
              <Palette />
              <Overview />
            </Sidebar>
            <Canvas />
            <Settings />
          </Container>
        </Workspace>
      </FibrProvider>
    </BlueprintProvider>
  );
}
