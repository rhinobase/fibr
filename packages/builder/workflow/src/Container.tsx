import { Container as BuilderContainer } from "@fibr/builder";
import { WorkflowCanvas } from "@fibr/canvas";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { WorkflowDndWrapper } from "./WorkflowDndWrapper";

export function Container() {
  return (
    <WorkflowDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <WorkflowCanvas />
        <Settings />
      </BuilderContainer>
    </WorkflowDndWrapper>
  );
}
