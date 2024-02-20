import { Container as BuilderContainer } from "@fibr/builder";
import { PageCanvas } from "@fibr/canvas";
import { Settings } from "@fibr/shared";
import { Sidebar } from "./Sidebar";
import { PageDndWrapper } from "./PageDndWrapper";

export function Container() {
  return (
    <PageDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <PageCanvas />
        <Settings />
      </BuilderContainer>
    </PageDndWrapper>
  );
}
