import { Container as BuilderContainer } from "@fibr/builder";
import { useBlueprint } from "../providers";
import { Canvas } from "./Canvas";
import { Settings } from "./Settings";
import { Sidebar } from "./Sidebar";

export function Container() {
  const activeBlock = useBlueprint(({ active }) => active.block);

  return (
    <BuilderContainer>
      <Sidebar />
      <Canvas />
      {activeBlock && <Settings />}
    </BuilderContainer>
  );
}
