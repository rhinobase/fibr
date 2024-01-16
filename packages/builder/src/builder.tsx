import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Canvas } from "./Canvas";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Screen } from "./Screen";
import { Settings } from "./Settings";
import { Workspace } from "./Workspace";
import { Sidebar, SidebarItem } from "./sidebar";

export function Builder() {
  return (
    <Workspace>
      <Header />
      <Container>
        <Sidebar>
          <SidebarItem
            name="palette"
            label="Palette"
            icon={<Squares2X2Icon className="h-5 w-5" />}
          >
            Palette Tab Content
          </SidebarItem>
          <SidebarItem
            name="over"
            label="Over"
            icon={<Squares2X2Icon className="h-5 w-5" />}
          >
            Over Tab Content
          </SidebarItem>
        </Sidebar>
        <Canvas>
          <Screen />
        </Canvas>
        <Settings />
      </Container>
      <Footer />
    </Workspace>
  );
}
