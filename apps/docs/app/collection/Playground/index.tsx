"use client";
import { Env, Workspace, useBuilder } from "@fibr/builder";
import {
  Button,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  eventHandler,
} from "@rafty/ui";
import { ThemeProvider } from "next-themes";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { VscDebugStart } from "react-icons/vsc";
import { Logo } from "../../../components/Logo";
import { ThemeToggle } from "../../../components/ThemeToggle";
import {
  ArrayField,
  Canvas,
  CanvasSettings,
  formBlocks,
  formConfig,
} from "./Blocks";
import { Builder } from "./Builder";

const DEFAULT_SCHEMA = [
  {
    id: "canvas",
    type: "canvas",
    label: "Contact Us",
  },
  {
    id: "name",
    type: "string",
    label: "Name",
    required: true,
    parentNode: "canvas",
    hidden: false,
  },
  {
    id: "icon",
    type: "string",
    label: "Icon",
    required: true,
    parentNode: "canvas",
  },
  {
    id: "slug",
    type: "string",
    label: "Slug",
    required: true,
    parentNode: "canvas",
  },
];

export default function CollectionPage() {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Workspace className="flex h-screen w-full flex-col">
        <Header />
        <Builder
          schema={DEFAULT_SCHEMA}
          blocks={formBlocks}
          config={{
            ...formConfig,
            canvas: { builder: Canvas, settings: CanvasSettings },
            array: { builder: ArrayField, settings: CanvasSettings },
          }}
        />
      </Workspace>
    </ThemeProvider>
  );
}

function Header() {
  const { isDevEnv, toggleEnv } = useBuilder(
    ({ env: { current, change } }) => ({
      isDevEnv: current === Env.DEVELOPMENT,
      toggleEnv: () =>
        change(current === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT),
    }),
  );

  const handleEnvToggle = eventHandler(() => toggleEnv());

  const EnvIcon = isDevEnv ? VscDebugStart : HiOutlineCodeBracketSquare;

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
      <div className="flex-1" />
      <ThemeToggle />
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<EnvIcon size={18} />}
            onClick={handleEnvToggle}
            onKeyDown={handleEnvToggle}
          >
            {isDevEnv ? "Preview" : "Sandbox"}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          isArrow={false}
          className="rounded px-1.5 py-1.5 text-[0.75rem] leading-none"
        >
          Toggle preview mode
        </TooltipContent>
      </Tooltip>
    </header>
  );
}
