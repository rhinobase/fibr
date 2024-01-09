import { Canvas } from "./Canvas";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Screen } from "./Screen";
import { Settings } from "./Settings";
import { Sidebar } from "./Sidebar";
import { Workspace } from "./Workspace";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

export function Builder() {
  return (
    <Workspace>
      <Header />
      <Container>
        <Sidebar
          options={[
            { label: "palette", icon: <Squares2X2Icon className="h-5 w-5" /> },
            { label: "over", icon: <Squares2X2Icon className="h-5 w-5" /> },
          ]}
        />
        <Canvas>
          <Screen />
        </Canvas>
        <Settings />
      </Container>
      <Footer />
    </Workspace>
  );
}
