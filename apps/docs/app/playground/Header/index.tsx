import { Header as BuilderHeader } from "@fibr/builder";
import { Logo } from "../../../components/Logo";
import { PreviewButton } from "./PreviewButton";

export function Header() {
  return (
    <BuilderHeader className="gap-2 px-2 py-1.5">
      <Logo className="w-6" />
      <div className="flex-1" />
      <PreviewButton />
    </BuilderHeader>
  );
}
