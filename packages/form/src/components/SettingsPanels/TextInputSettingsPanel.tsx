import { InputField, Label, Switch } from "@rafty/ui";

export function TextInputSettingsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 items-center gap-y-2">
        <h3 className="col-span-3 text-lg font-semibold">Basic</h3>
        <Label className="col-span-1">Label</Label>
        <InputField className="col-span-2" />
        <Label className="col-span-1">Caption</Label>
        <InputField className="col-span-2" />
        <Label className="col-span-1">Hidden</Label>
        <InputField className="col-span-2" />
        <Label className="col-span-1">Placeholder</Label>
        <InputField className="col-span-2" />
        <Label className="col-span-1">Default value</Label>
        <InputField className="col-span-2" />
      </div>
      <div className="grid grid-cols-3 items-center gap-y-2">
        <h3 className="col-span-3 text-lg font-semibold">Advanced</h3>
        <Label className="col-span-1">Disabled</Label>
        <InputField className="col-span-2" />
        <Label className="col-span-1">Tooltip</Label>
        <InputField className="col-span-2" />
      </div>
      <div className="grid grid-cols-3 items-center">
        <Label className="col-span-1">Required</Label>
        <Switch />
      </div>
    </div>
  );
}
