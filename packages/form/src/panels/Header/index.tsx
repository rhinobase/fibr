import { Header as BuilderHeader } from "@fibr/builder";
import { PreviewButton } from "./PreviewButton";
import { PublishButton } from "./PublishButton";

export function Header() {
  return (
    <BuilderHeader className="gap-2 px-2 py-1.5">
      <h1 className="text-xl font-bold leading-none">rhinobase</h1>
      <div className="flex-1" />
      <PreviewButton />
      <PublishButton />
    </BuilderHeader>
  );
}
