import { Container as BuilderContainer } from "@fibr/builder";
import { Settings, SharedWrapper } from "@fibr/shared";
import { FormBuilderCanvas } from "./Canvas";
import { Sidebar } from "./Sidebar";

export function FormBuilder(props: SharedWrapper) {
  return (
    <SharedWrapper {...props} enableMultiSelect={false}>
      <BuilderContainer className="relative flex-1 overflow-y-auto">
        <Sidebar />
        <FormBuilderCanvas />
        <Settings />
      </BuilderContainer>
    </SharedWrapper>
  );
}
