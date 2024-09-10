import { Container as BuilderContainer } from "@fibr/builder";
import { Settings } from "@fibr/shared";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";

export function Container() {
  return (
    <BuilderContainer className="relative flex-1 overflow-y-auto">
      <Sidebar />
      <Canvas />
      <Settings />
    </BuilderContainer>
  );
}
