import { Container as BuilderContainer } from "@fibr/builder";
import { Settings } from "@fibr/shared";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";

export function Container() {
  return (
    <BuilderContainer>
      <Sidebar />
      <Canvas />
      <Settings />
    </BuilderContainer>
  );
}
