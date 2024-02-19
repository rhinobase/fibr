import { type BlockType } from "@fibr/providers";
import { SharedWrapper } from "@fibr/shared";
import { ReactFlowProvider } from "reactflow";
import { Container } from "./Container";

export function WorkflowBuilder<T extends BlockType>(props: SharedWrapper<T>) {
  return (
    <SharedWrapper {...props}>
      <ReactFlowProvider>
        <Container />
      </ReactFlowProvider>
    </SharedWrapper>
  );
}
