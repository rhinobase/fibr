import { Canvas, Settings, Sidebar } from "./panels";
import { useBlueprint } from "./providers";
import { Container } from "@fibr/builder";

export function ContainerPanel() {
  const {
    fields: { selected },
  } = useBlueprint();

  return (
    <Container>
      <Sidebar />
      <Canvas />
      {selected && <Settings />}
    </Container>
  );
}
