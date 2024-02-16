import { SidebarItem } from "@fibr/builder";
import { type CanvasType, useCanvas } from "@fibr/providers";
import {
  CheckIcon,
  CodeBracketSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Tab,
  TabContent,
  TabList,
  TabTrigger,
  useBoolean,
} from "@rafty/ui";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { CodeHighlighter } from "./Highlight";

export type CodeGenerator = {
  resolver?: (schema: Record<string, CanvasType | undefined>) => string;
};

enum CodeTab {
  AST = "ast",
  RESOLVER = "resolver",
}

export function CodeGenerator({ resolver }: CodeGenerator) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, toggle] = useBoolean();
  const [tabValue, setTabValue] = useState(CodeTab.AST);

  // Schema code
  const schema = useCanvas(({ schema }) => schema);
  const [ast, code] = useMemo(
    () => [
      JSON.stringify(schema, null, 2),
      resolver?.(schema) ?? "// No Resolver",
    ],
    [resolver, schema],
  );

  const codeContent: Record<CodeTab, { language: string; content: string }> = {
    [CodeTab.AST]: {
      language: "js",
      content: ast,
    },
    [CodeTab.RESOLVER]: {
      language: "tsx",
      content: code,
    },
  };

  useEffect(() => {
    if (!copied) return;

    // Use setTimeout to update the message after 1500 milliseconds (1.5 seconds)
    const timeoutId = setTimeout(() => {
      toggle(false);
    }, 1500);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [copied, toggle]);

  const handleCopy = () => {
    copyToClipboard(codeContent[tabValue].content);
    toggle(true);
  };

  return (
    <SidebarItem
      name="code"
      label="Code"
      icon={<CodeBracketSquareIcon className="size-5 stroke-2" />}
      className="h-full"
      action={
        <Button
          size="icon"
          variant="ghost"
          className="ml-auto rounded p-0.5"
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? (
            <CheckIcon className="size-4 stroke-2 text-green-500" />
          ) : (
            <DocumentDuplicateIcon className="size-4 stroke-2" />
          )}
        </Button>
      }
    >
      <Tab
        className="flex h-full w-full flex-col"
        size="sm"
        value={tabValue}
        onValueChange={(value) => setTabValue(value as CodeTab)}
      >
        <TabList>
          {Object.entries(CodeTab).map(([key, value]) => (
            <TabTrigger key={key} value={value} className="capitalize">
              {value}
            </TabTrigger>
          ))}
        </TabList>
        {Object.entries(codeContent).map(([key, data]) => (
          <TabContent
            key={key}
            value={key}
            className="flex-1 overflow-hidden overflow-y-auto"
          >
            <CodeHighlighter {...data} />
          </TabContent>
        ))}
      </Tab>
    </SidebarItem>
  );
}
