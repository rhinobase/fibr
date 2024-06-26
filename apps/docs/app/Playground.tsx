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
import { type BlockType, EditorEvent } from "@fibr/providers";
import { WorkflowBuilder } from "@fibr/workflow";
import { Text } from "@rafty/ui";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { ThemeToggle } from "../components/ThemeToggle";
import { Container, TemplateDialog } from "./templates";

type PanelProps = { template: BlockType[] };

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
    <>
      <Workspace
        initialEvents={{
          [EditorEvent.ALL]: [
            ({ event_type, ...props }) => console.log(event_type, props),
          ],
        }}
      >
        <Header className="gap-3">
          <div className="flex-1" />
          <ThemeToggle />
          <PreviewButton />
        </Header>
        {template ? (
          <Component template={template} />
        ) : (
          <div className="flex-1" />
        )}
        <Footer className="[&>p]:text-2xs [&>p]:select-none">
          <Text isMuted>version {process.env.NEXT_PUBLIC_VERSION}</Text>
          <div className="flex-1" />
          <Text isMuted>
            © {new Date().getFullYear()} rhinobase, Inc. All rights reserved.
          </Text>
          <div className="flex-1" />
          <Socials />
        </Footer>
      </Workspace>
      <TemplateDialog
        container={container}
        onContainerChange={setContainer}
        onSelect={(value) => setTemplate(value as PanelProps["template"])}
      />
    </>
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
          className="text-secondary-500 dark:text-secondary-400 dark:hover:text-secondary-50 transition-all ease-in-out hover:text-black"
          target="_blank"
          rel="noopener"
        >
          <Icon size={15} />
        </Link>
      ))}
    </div>
  );
}
