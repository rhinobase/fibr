import { Container, Footer, Header, Sidebar, Workspace } from "@fibr/builder";
import { Canvas, Overview, Palette, Settings } from "./panels";
import { BlueprintProvider } from "./providers";
import { FibrProvider } from "@fibr/react";

export function FormBuilder() {
  return (
    <BlueprintProvider>
      <FibrProvider plugins={[]}>
        <Workspace>
          <Header className="justify-center">Header</Header>
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
