import { SidebarItem } from "@fibr/builder";
import { useFormBuilder } from "@fibr/providers";
import {
  CodeBracketSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@rafty/ui";
import { format as prettyFormat } from "pretty-format";
import { useCopyToClipboard } from "@uidotdev/usehooks";

export function CodeGenerator() {
  const [_, copyToClipboard] = useCopyToClipboard();
  const schema = useFormBuilder((state) => state.schema);

  const content = prettyFormat(schema);

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
            onClick={() => copyToClipboard(content)}
            title="Copy code"
          >
            <DocumentDuplicateIcon className="size-4 stroke-2" />
          </Button>
        </div>
        <hr />
      </div>
      <pre className="h-full overflow-x-auto px-3">{content}</pre>
    </SidebarItem>
  );
}
