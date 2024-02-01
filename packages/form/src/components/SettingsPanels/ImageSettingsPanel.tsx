import { InputField, Label } from "@rafty/ui";

export function ImageSettingsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 items-center gap-y-2">
        <h3 className="col-span-3 text-lg font-semibold">Basic</h3>
        <Label className="col-span-1">Hidden</Label>
        <InputField className="col-span-2" />
        <Label className="col-span-1">Src</Label>
        <InputField className="col-span-2" />
      </div>
      <div className="grid grid-cols-3 items-center gap-y-2">
        <h3 className="col-span-3 text-lg font-semibold">Advanced</h3>
        <Label className="col-span-1">Tooltip</Label>
        <InputField className="col-span-2" />
      </div>
    </div>
  );
}
