import { Container, Sidebar, Workspace } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { Canvas, Header, Overview, Palette, Settings } from "./panels";
import { BlueprintProvider } from "./providers";

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
