/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  formBlocks,
  formConfig,
  pageBlocks,
  pageConfig,
  workflowBlocks,
  workflowConfig,
} from "@fibr/blocks";
import { Footer, Header, PreviewButton, Workspace } from "@fibr/builder";
import { FormBuilder } from "@fibr/form";
import { PageBuilder } from "@fibr/page";
import { type BaseBlockType, EditorEvent } from "@fibr/providers";
import { WorkflowBuilder } from "@fibr/workflow";
import { Text } from "@rafty/ui";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Container, TemplateDialog } from "./templates";

type PanelProps = { template: Record<string, BaseBlockType> };

const PANELS: Record<Container, (props: PanelProps) => ReactNode> = {
  [Container.FORM]: ({ template }) => (
    <FormBuilder
      initialSchema={template}
      blocks={formBlocks}
      config={formConfig}
    />
  ),
  [Container.WORKFLOW]: ({ template }) => (
    <WorkflowBuilder
      initialSchema={template}
      blocks={workflowBlocks}
      config={workflowConfig}
    />
  ),
  [Container.PAGE]: ({ template }) => (
    <PageBuilder
      initialSchema={template}
      blocks={pageBlocks}
      config={pageConfig}
    />
  ),
};

export default function Playground() {
  const [container, setContainer] = useState(Container.FORM);
  const [template, setTemplate] = useState<PanelProps["template"]>();

  const Component = PANELS[container];

  return (
    <Workspace
      initialEvents={{
        [EditorEvent.ALL]: [
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          ({ type, ...props }: any) => console.log(type, props),
        ],
      }}
    >
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
        <Text isMuted className="px-1">
          version {process.env.NEXT_PUBLIC_VERSION}
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
