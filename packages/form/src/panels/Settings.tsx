import { Settings as BuilderSettings } from "@fibr/builder";
import { useBlueprint } from "../providers";
import { settingsPanel } from "../components";
import { FibrProvider, Thread } from "@fibr/react";

export function Settings() {
  const {
    fields: { get },
    active,
  } = useBlueprint();

  const fieldId = active.field;
  const formId = active.form;

  if (!formId || !fieldId) throw new Error("Unable to find an active form!");

  const field = get(formId, fieldId);

  if (!field) throw new Error("Unable find the field!");

  return (
    <BuilderSettings className="flex flex-col gap-3">
      <FibrProvider plugins={settingsPanel}>
        <h4 className="font-medium">Settings</h4>
        <hr />
        <p className="text-secondary-600 text-sm font-medium">{field.type}</p>
        <p className="text-secondary-600 text-sm font-medium">{active.field}</p>
        <Thread id={fieldId} {...field} />
      </FibrProvider>
    </BuilderSettings>
  );
}
