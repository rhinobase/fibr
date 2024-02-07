"use client";
import { ThreadType } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { Dialog, DialogContent, DialogOverlay, useBoolean } from "@rafty/ui";
import { useEffect } from "react";
import { Switch } from "./Switch";
import { TEMPLATES } from "./templates";

export type TemplateDialog = {
  container: Switch["value"];
  onContainerChange: Switch["onValueChange"];
  onSelect: (template: ThreadType) => void;
};

export function TemplateDialog({
  container,
  onContainerChange,
  onSelect,
}: TemplateDialog) {
  const [isOpen, toggle] = useBoolean();

  useEffect(() => {
    toggle(true);
  }, [toggle]);

  const handleSelect = (template: ThreadType) =>
    eventHandler(() => {
      onSelect(template);
      toggle(false);
    });

  return (
    <Dialog open={isOpen}>
      <DialogOverlay />
      <DialogContent showCloseButton={false} className="space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-semibold">Templates</h4>
          <Switch value={container} onValueChange={onContainerChange} />
        </div>
        <div className="grid w-full grid-cols-4 gap-3">
          {TEMPLATES[container].map(({ id, name, icon: Icon, template }) => (
            <div
              key={id}
              onClick={handleSelect(template)}
              onKeyDown={handleSelect(template)}
              className="flex size-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded border p-3 transition-all ease-in-out hover:shadow"
            >
              <Icon size={30} />
              {name}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
