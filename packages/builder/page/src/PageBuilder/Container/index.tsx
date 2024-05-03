import { Container as BuilderContainer } from "@fibr/builder";
import { PageCanvas } from "@fibr/canvas";
import { Settings } from "@fibr/shared";
import { PageDndWrapper } from "./PageDndWrapper";
import { Sidebar } from "./Sidebar";

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
