"use client";
import { EditorEvent, Workspace, WorkspaceErrorType } from "@fibr/builder";
import { Text, Toast } from "@rafty/ui";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { formBlocks, formConfig } from "./Blocks";
import { FormBuilder } from "./FormBuilder";

export default function Playground() {
  return (
    <Workspace
      className="flex h-screen w-full flex-col"
      initialEvents={{
        [EditorEvent.ALL]: [
          ({ event_type, ...props }) => console.log(event_type, props),
        ],
      }}
      onError={onErrorHandle}
    >
      <Header />
      <FormBuilder
        initialSchema={[
          {
            id: "canvas",
            type: "div",
            data: {
              title: "Nested",
              className: ["w-full", "h-full", "px-6"],
            },
          },
          {
            id: "header",
            type: "div",
            data: {
              className: ["px-2", "py-1.5", "flex", "justify-between"],
            },
            parentNode: "canvas",
          },
          {
            id: "logo",
            type: "text",
            data: {
              content: "Reweb",
            },
            parentNode: "header",
          },
          {
            id: "nav",
            type: "div",
            data: {
              className: ["flex", "items-center", "gap-12"],
            },
            parentNode: "header",
          },
          {
            id: "nav1",
            type: "text",
            data: {
              content: "Blog",
            },
            parentNode: "nav",
          },
          {
            id: "nav2",
            type: "text",
            data: {
              content: "Pricing",
            },
            parentNode: "nav",
          },
          {
            id: "nav3",
            type: "text",
            data: {
              content: "Docs",
            },
            parentNode: "nav",
          },
          {
            id: "header-1",
            type: "div",
            data: {
              className: [
                "px-8",
                "py-14",
                "space-y-12",
                "flex",
                "flex-col",
                "items-center",
                "text-center",
              ],
            },
            parentNode: "canvas",
          },
          {
            id: "editable",
            type: "div",
            data: {
              className: ["text-4xl", "font-bold"],
            },
            parentNode: "header-1",
          },
          {
            id: "text-1",
            type: "text",
            data: {
              content:
                "Edit this template or click New Design to start building from scratch",
            },
            parentNode: "editable",
          },
          {
            id: "link-1",
            type: "div",
            data: {
              className: ["text-xl", "opacity-60", "max-w-lg"],
            },
            parentNode: "header-1",
          },
          {
            id: "nextjs",
            type: "text",
            data: {
              content:
                "Build at the speed of no-code. Export Next.js & Tailwind code. Customize with no limits.",
            },
            parentNode: "link-1",
          },
        ]}
        blocks={formBlocks}
        config={formConfig}
      />
      <Footer />
    </Workspace>
  );
}

function Header() {
  return (
    <header className="border-secondary-200 dark:border-secondary-800 flex w-full items-center gap-3 border-b px-2 py-0.5">
      <a
        title="Fibr Logo"
        href="https://www.rhinobase.io/"
        className="flex select-none items-baseline gap-0.5"
      >
        <Text className="text-xl font-bold italic">Reweb</Text>
      </a>
    </header>
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

function Footer() {
  return (
    <footer className="border-secondary-200 dark:border-secondary-800 flex w-full select-none items-center border-t text-[0.75rem] leading-[1.25rem]">
      <Text isMuted>version {process.env.NEXT_PUBLIC_VERSION}</Text>
      <div className="flex-1" />
      <Text isMuted>
        © {new Date().getFullYear()} rhinobase, Inc. All rights reserved.
      </Text>
      <div className="flex-1" />
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
    </footer>
  );
}

function onErrorHandle({
  type,
  data,
}: {
  type: WorkspaceErrorType;
  data?: { id: string | string[] } | null;
}) {
  const ErrorsData: Record<
    WorkspaceErrorType,
    { title: string; message?: string }
  > = {
    [WorkspaceErrorType.BLOCK_NOT_FOUND]: {
      title: "Unable to find the block",
    },
    [WorkspaceErrorType.GROUP_NOT_VALID]: {
      title: "Parent group not matching",
      message: "All the nodes should be of the same group/parent node.",
    },
    [WorkspaceErrorType.ID_ALREADY_EXIST]: {
      title: `"${data?.id}" is a component that already exists`,
    },
    [WorkspaceErrorType.ID_NOT_FOUND]: {
      title: `Unable to find the block with Id "${data?.id}"`,
    },
    [WorkspaceErrorType.SCHEMA_NOT_VALID]: {
      title: "Schema is not valid",
      message: "One or more fields in schema are not available.",
    },
  };

  const temp = ErrorsData[type];

  toast.custom(
    (t) => <Toast severity="error" title={temp.title} visible={t.visible} />,
    { id: type },
  );
}
