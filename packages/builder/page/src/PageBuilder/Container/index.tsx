import { Container as BuilderContainer, Env, useBuilder } from "@fibr/builder";
import { PageCanvas } from "@fibr/canvas";
import { Settings } from "@fibr/shared";
import { PageDndWrapper } from "./PageDndWrapper";
import { Sidebar } from "./Sidebar";
import type { PropsWithChildren, ReactNode } from "react";
import { NodeWrapper } from "./NodeWrapper";
import { NodePadding } from "./NodePadding";

const NODE_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: NodeWrapper,
  [Env.PRODUCTION]: NodePadding,
};

export function Container() {
  const currentEnv = useBuilder(({ env }) => env.current);

  return (
    <PageDndWrapper>
      <BuilderContainer>
        <Sidebar />
        <PageCanvas componentWrapper={NODE_WRAPPERS[currentEnv]} />
        <Settings />
      </BuilderContainer>
    </PageDndWrapper>
  );
}
