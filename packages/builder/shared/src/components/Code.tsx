import { SidebarItem } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import {
  CodeBracketSquareIcon,
  DocumentDuplicateIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Button, classNames, useBoolean } from "@rafty/ui";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useId } from "react";

import superjson from "superjson";

export type CodeGenerator = {
  code?: string;
};

export function CodeGenerator(porps: CodeGenerator) {
  const id = useId();
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, toggle] = useBoolean();
  const schema = useCanvas((state) => state.schema);

  const code = superjson.stringify(schema);

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
    copyToClipboard(code);
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
          className="rounded p-0.5"
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
      <Highlight
        theme={themes.github}
        code={JSON.stringify(JSON.parse(code), null, 2)}
        language="js"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={style}
            className={classNames("h-full overflow-x-auto px-3", className)}
          >
            {tokens.map((line, i) => (
              <div key={`${i}-${id}`} {...getLineProps({ line })}>
                <span className="mr-4">{i + 1}</span>
                {line.map((token, key) => (
                  <span
                    key={`${key}-${i}-${id}`}
                    {...getTokenProps({ token })}
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </SidebarItem>
  );
}
