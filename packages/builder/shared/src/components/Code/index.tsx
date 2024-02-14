import { SidebarItem } from "@fibr/builder";
import { type CanvasType, useCanvas } from "@fibr/providers";
import { type ThreadType } from "@fibr/react";
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
import superjson from "superjson";
import { CodeHighlighter } from "./Highlight";

export type CodeGenerator = {
  resolver?: (schema: Map<string, ThreadType<CanvasType>>) => string;
};

export function CodeGenerator({ resolver }: CodeGenerator) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, toggle] = useBoolean();
  const [tabValue, setTabValue] = useState("schematics");
  // Schema code
  const schema = useCanvas(({ schema }) => schema);
  const [ast, code] = useMemo(
    () => [
      JSON.stringify(JSON.parse(superjson.stringify(schema)), null, 2),
      resolver?.(schema) ?? "// No Resolver",
    ],
    [resolver, schema],
  );

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
    if (tabValue === "schematics") copyToClipboard(ast);
    else copyToClipboard(code);
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
        onValueChange={setTabValue}
      >
        <TabList>
          <TabTrigger value="schematics">Schematics</TabTrigger>
          <TabTrigger value="resolver">Resolver</TabTrigger>
        </TabList>
        <TabContent
          value="schematics"
          className="flex-1 overflow-hidden overflow-y-auto"
        >
          <CodeHighlighter language="js" content={ast} />
        </TabContent>
        <TabContent value="resolver">
          <CodeHighlighter language="tsx" content={code} />
        </TabContent>
      </Tab>
    </SidebarItem>
  );
}
