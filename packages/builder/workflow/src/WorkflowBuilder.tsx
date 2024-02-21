import { SharedWrapper } from "@fibr/shared";
import { ReactFlowProvider } from "reactflow";
import { Container } from "./Container";

export function WorkflowBuilder(props: SharedWrapper) {
  return (
    <SharedWrapper {...props}>
      <ReactFlowProvider>
        <Container />
      </ReactFlowProvider>
    </SharedWrapper>
  );
}
