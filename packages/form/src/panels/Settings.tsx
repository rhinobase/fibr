import { Settings as BuilderSettings } from "@fibr/builder";
import { useBlueprint } from "../providers";
import { TextSettingsPanel } from "../components";

export function Settings() {
  const {
    fields: { selected, get },
  } = useBlueprint();

  if (selected === null) return;

  const field = get(selected);

  return (
    <BuilderSettings className="flex flex-col gap-3">
      <h4 className="font-medium">Settings</h4>
      <hr />
      <p className="text-secondary-600 text-sm font-medium">{field?.type}</p>
      <p className="text-secondary-600 text-sm font-medium">{selected}</p>
      <TextSettingsPanel />
    </BuilderSettings>
  );
}
