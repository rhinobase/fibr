import { SidebarItem } from "@fibr/builder";
import { type BlockType, useCanvas } from "@fibr/providers";
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
  classNames,
  useBoolean,
} from "@rafty/ui";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { CodeHighlighter } from "./Highlight";

export type CodeGenerator = {
  resolvers?: {
    name: string;
    label: string;
    icon?: ReactNode;
    language?: string;
    resolver: (schema: BlockType[]) => string;
  }[];
};

export function CodeGenerator({ resolvers }: CodeGenerator) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, toggle] = useBoolean();
  const [tabValue, setTabValue] = useState(0);

  // Schema code
  const schema = useCanvas(({ schema }) => schema);
  const computedResolvers = useMemo(
    () =>
      resolvers?.map((value) => ({ ...value, code: value.resolver(schema) })) ??
      [],
    [resolvers, schema],
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
    copyToClipboard(computedResolvers[tabValue].code);
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
        value={String(tabValue)}
        onValueChange={(value) => setTabValue(Number(value))}
      >
        <TabList>
          {computedResolvers.map(({ name, label, icon }, index) => (
            <TabTrigger
              key={name}
              value={String(index)}
              className={classNames(
                icon && "flex items-center gap-1",
                "group/code-tab-trigger",
              )}
            >
              {icon}
              {label}
            </TabTrigger>
          ))}
        </TabList>
        {computedResolvers.map(({ name, language = "js", code }, index) => (
          <TabContent
            key={name}
            value={String(index)}
            className="flex-1 overflow-hidden overflow-y-auto"
          >
            <CodeHighlighter language={language} content={code} />
          </TabContent>
        ))}
      </Tab>
    </SidebarItem>
  );
}
