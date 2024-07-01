import { Container as BuilderContainer } from "@fibr/builder";
import { WorkflowCanvas } from "@fibr/canvas";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { WorkflowDndWrapper } from "./WorkflowDndWrapper";
import { NodeWrapper } from "./NodeWrapper";

export function Container() {
  return (
    <WorkflowDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <WorkflowCanvas nodeWrapper={NodeWrapper} />
        <Settings className="right-2 top-2 h-[calc(100%-16px)] rounded-md border-l-0 shadow-md" />
      </BuilderContainer>
    </WorkflowDndWrapper>
  );
}
