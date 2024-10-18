import { SidebarItem, useCanvas, type BlockType } from "@fibr/builder";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
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
import { ShikiProvider } from "../../providers";
import { CodeHighlighter } from "./Highlight";

export type CodeGenerator = {
  resolvers?: {
    name: string;
    label: string;
    icon?: ReactNode;
    language?: string;
    resolver: (schema: BlockType[]) => string;
  }[];
  trigger: ReactNode;
};

export function CodeGenerator({ resolvers, trigger }: CodeGenerator) {
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
      trigger={trigger}
      className="h-full w-full flex-col text-black data-[state=active]:flex dark:text-white"
    >
      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Code</h4>
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
        </div>
        <hr className="dark:border-secondary-700" />
      </div>
      <div className="h-full overflow-y-auto">
        <div className="flex h-full flex-col px-3 pb-3">
          <ShikiProvider>
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
              {computedResolvers.map(
                ({ name, language = "js", code }, index) => (
                  <TabContent
                    key={name}
                    value={String(index)}
                    className="flex-1 overflow-auto"
                  >
                    <CodeHighlighter language={language} content={code} />
                  </TabContent>
                ),
              )}
            </Tab>
          </ShikiProvider>
        </div>
      </div>
    </SidebarItem>
  );
}
