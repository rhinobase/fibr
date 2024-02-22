import { Container as BuilderContainer } from "@fibr/builder";
import { FormBuilderCanvas } from "@fibr/canvas";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";

export function Container() {
  return (
    <BuilderContainer>
      <Sidebar />
      <FormBuilderCanvas />
      <Settings />
    </BuilderContainer>
  );
}
