import { SharedWrapper } from "@fibr/shared";
import { ReactFlowProvider } from "reactflow";
import { Container } from "./Container";

export function PageBuilder(props: SharedWrapper) {
  return (
    <SharedWrapper {...props}>
      <ReactFlowProvider>
        <Container />
      </ReactFlowProvider>
    </SharedWrapper>
  );
}
