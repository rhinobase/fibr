import { Header as BuilderHeader } from "@fibr/builder";
import { Logo } from "../../../components/Logo";
import { PreviewButton } from "./PreviewButton";
import { Switch } from "./Switch";

export type Header = {
  container: Switch["value"];
  onContainerChange: Switch["onValueChange"];
};

export function Header({ container, onContainerChange }: Header) {
  return (
    <BuilderHeader className="gap-2 px-2 py-1.5">
      <Logo className="w-6" />
      <div className="flex-1" />
      <Switch value={container} onValueChange={onContainerChange} />
      <div className="flex-1" />
      <PreviewButton />
    </BuilderHeader>
  );
}
