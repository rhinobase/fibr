/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Footer, Header, PreviewButton, Workspace } from "@fibr/builder";
import { FormBuilder } from "@fibr/form";
import { PageBuilder } from "@fibr/page";
import { CanvasType } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { WorkflowBuilder } from "@fibr/workflow";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Text,
} from "@rafty/ui";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { FaBook, FaXTwitter } from "react-icons/fa6";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
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
      {template && <Component template={template} />}
      <Footer>
        <div className="flex-1" />
        <Text isMuted className="text-2xs">
          © {new Date().getFullYear()} rhinobase, Inc. All rights reserved.
        </Text>
        <div className="flex-1" />
        <FooterMenu />
      </Footer>
    </Workspace>
  );
}

function FooterMenu() {
  return (
    <Menu size="sm">
      <MenuTrigger size="icon" variant="ghost" className="rounded-none">
        <HiOutlineQuestionMarkCircle />
      </MenuTrigger>
      <MenuContent
        align="end"
        alignOffset={10}
        sideOffset={10}
        className="min-w-max space-y-0 overflow-hidden p-0"
        isArrow={false}
      >
        <MenuGroup className="p-1">
          <Link href="/">
            <MenuItem>
              <FaBook /> View Documentation
            </MenuItem>
          </Link>
          <Link
            href="https://twitter.com/rhinobaseio"
            target="_blank"
            rel="noopener"
          >
            <MenuItem>
              <FaXTwitter /> @rhinobaseio
            </MenuItem>
          </Link>
        </MenuGroup>
        <MenuSeparator />
        <div className="bg-secondary-50 text-secondary-500 select-none px-2.5 text-center text-[11px]">
          Fibr version 0.0.1
        </div>
      </MenuContent>
    </Menu>
  );
}
