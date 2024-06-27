"use client";
import { workflowBlocks, workflowConfig } from "@fibr/blocks";
import { Workspace } from "@fibr/builder";
import { WorkflowBuilder } from "@fibr/workflow";
import { Text } from "@rafty/ui";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Logo } from "../../components/Logo";

export default function Playground() {
  return (
    <>
      <Workspace>
        <Header />
        <WorkflowBuilder blocks={workflowBlocks} config={workflowConfig} />
        <Footer />
      </Workspace>
    </>
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
        <Logo className="h-4 w-auto" />
        <Text className="text-xl font-bold italic">Fibr</Text>
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
