import { Header as BuilderHeader } from "@fibr/builder";
import { PreviewButton } from "./PreviewButton";
import { PublishButton } from "./PublishButton";
import { Logo } from "./Logo";

export function Header() {
  return (
    <BuilderHeader className="gap-2 px-2 py-1.5">
      <Logo />
      <div className="flex-1" />
      <PreviewButton />
      <PublishButton />
    </BuilderHeader>
  );
}
