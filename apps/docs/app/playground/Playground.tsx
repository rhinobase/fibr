/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Header, PreviewButton, Workspace } from "@fibr/builder";
import { FormBuilder } from "@fibr/form";
import { CanvasType } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { WorkflowBuilder } from "@fibr/workflow";
import { type ReactNode, useState } from "react";
import { BLOCKS, CONFIG, WORKFLOW_BLOCKS, WORKFLOW_CONFIG } from "./config";
import { Container, TemplateDialog } from "./templates";

type PanelProps = { template: Map<string, ThreadType<CanvasType>> };

const PANELS: Record<Container, (props: PanelProps) => ReactNode> = {
  [Container.FORM]: ({ template }) => {
    const key = template.keys().next().value;

    return (
      <FormBuilder
        initialSchema={template}
        defaultActiveCanvas={key}
        defaultActiveBlock={key}
        blocks={BLOCKS}
        config={CONFIG}
      />
    );
  },
  [Container.WORKFLOW]: ({ template }) => {
    const key = template.keys().next().value;

    return (
      <WorkflowBuilder
        initialSchema={template}
        defaultActiveCanvas={key}
        blocks={WORKFLOW_BLOCKS}
        config={WORKFLOW_CONFIG}
      />
    );
  },
  [Container.PAGE]: () => <></>,
};

export default function Playground() {
  const [container, setContainer] = useState(Container.FORM);
  const [template, setTemplate] = useState<PanelProps["template"]>();

  const Component = PANELS[container];

  return (
    <Workspace>
      <Header className="gap-2 px-2 py-1.5">
        <div className="flex-1" />
        <PreviewButton />
      </Header>
      <TemplateDialog
        container={container}
        onContainerChange={setContainer}
        onSelect={setTemplate}
      />
      {template && <Component template={template} />}
    </Workspace>
  );
}
