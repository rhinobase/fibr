"use client";
import { Footer, Header, PreviewButton, Workspace } from "@fibr/builder";
import { FormBuilder } from "@fibr/form";
import { PageBuilder } from "@fibr/page";
import { CanvasType } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { WorkflowBuilder } from "@fibr/workflow";
import { Text } from "@rafty/ui";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
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
  [Container.PAGE]: ({ template }) => {
    const key = template.keys().next().value;

    return (
      <PageBuilder
        initialSchema={template}
        defaultActiveCanvas={key}
        defaultActiveBlock={key}
        blocks={BLOCKS}
        config={CONFIG}
      />
    );
  },
};

export default function Playground() {
  const [container, setContainer] = useState(Container.FORM);
  const [template, setTemplate] = useState<PanelProps["template"]>();

  const Component = PANELS[container];

  return (
    <Workspace>
      <Header>
        <div className="flex-1" />
        <PreviewButton />
      </Header>
      <TemplateDialog
        container={container}
        onContainerChange={setContainer}
        onSelect={setTemplate}
      />
      {template ? (
        <Component template={template} />
      ) : (
        <div className="flex-1" />
      )}
      <Footer className="[&>p]:text-2xs [&>p]:select-none">
        <Text isMuted className="bg-secondary-300 px-1">
          version 1.0.0
        </Text>
        <div className="flex-1" />
        <Text isMuted>
          © {new Date().getFullYear()} rhinobase, Inc. All rights reserved.
        </Text>
        <div className="flex-1" />
        <Socials />
      </Footer>
    </Workspace>
  );
}

const SOCIALS = {
  twitter: {
    link: "https://twitter.com/rhinobaseio",
    icon: FaXTwitter,
  },
  github: {
    link: "https://github.com/rhinobase/fibr",
    icon: FaGithub,
  },
};

function Socials() {
  return (
    <div className="flex items-center gap-2 px-2">
      {Object.entries(SOCIALS).map(([name, { link, icon: Icon }]) => (
        <Link
          key={name}
          href={link}
          title={name}
          className="text-secondary-500 transition-all ease-in-out hover:text-black"
          target="_blank"
          rel="noopener"
        >
          <Icon size={15} />
        </Link>
      ))}
    </div>
  );
}
