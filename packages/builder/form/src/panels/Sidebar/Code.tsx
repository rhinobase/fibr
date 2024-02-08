import { SidebarItem } from "@fibr/builder";
import { useFormBuilder } from "@fibr/providers";
import {
  CodeBracketSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Button, classNames } from "@rafty/ui";
import superjson from "superjson";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Highlight, themes } from "prism-react-renderer";
import { useId } from "react";

export function CodeGenerator() {
  const id = useId();
  const [_, copyToClipboard] = useCopyToClipboard();
  const schema = useFormBuilder((state) => state.schema);

  const code = JSON.stringify(JSON.parse(superjson.stringify(schema)), null, 2);

  return (
    <SidebarItem
      name="code"
      label="Code"
      icon={<CodeBracketSquareIcon className="size-5 stroke-2" />}
      className="flex-col overflow-hidden overflow-y-auto data-[state=active]:flex data-[orientation=vertical]:p-0"
    >
      <div className="sticky top-0 z-10 bg-white p-3">
        <div className="mb-3 flex items-center">
          <h4 className="flex-1 font-medium">Code</h4>
          <Button
            size="icon"
            variant="ghost"
            className="rounded p-0.5"
            onClick={() => copyToClipboard(code)}
            title="Copy code"
          >
            <DocumentDuplicateIcon className="size-4 stroke-2" />
          </Button>
        </div>
        <hr />
      </div>
      <Highlight theme={themes.github} code={code} language="js">
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
