import { SidebarItem } from "@fibr/builder";
import { useCanvas, type BlockType } from "@fibr/providers";
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
import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  const [isCopied, toggleCopied] = useBoolean();
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
    if (!isCopied) return;

    // Use setTimeout to update the message after 1500 milliseconds (1.5 seconds)
    const timeoutId = setTimeout(() => {
      toggleCopied(false);
    }, 1500);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [isCopied, toggleCopied]);

  const handleCopy = () => {
    copyToClipboard(computedResolvers[tabValue].code);
    toggleCopied(true);
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
          onKeyDown={handleCopy}
          title="Copy code"
        >
          {isCopied ? (
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
              className={classNames(icon && "flex items-center gap-1")}
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
