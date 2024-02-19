import { type BaseBlockType } from "@fibr/providers";
import { SharedWrapper } from "@fibr/shared";
import { ReactFlowProvider } from "reactflow";
import { Container } from "./Container";

export function PageBuilder<T extends BaseBlockType>(props: SharedWrapper<T>) {
  return (
    <SharedWrapper {...props}>
      <ReactFlowProvider>
        <Container />
      </ReactFlowProvider>
    </SharedWrapper>
  );
}
