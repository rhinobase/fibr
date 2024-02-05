"use client";
import { Form } from "@fibr/blocks";
import { useBlueprint } from "../providers";
import { Dialog, DialogContent, DialogOverlay, useBoolean } from "@rafty/ui";
import { useEffect } from "react";
import { eventHandler } from "@rafty/shared";
import { ThreadType } from "@fibr/react";
import { TEMPLATES } from "./templates";

export function TemplateDialog() {
  const [isOpen, toggle] = useBoolean();
  const add = useBlueprint((state) => state.forms.add);

  useEffect(() => {
    toggle(true);
  }, [toggle]);

  const handleSelect = (template: ThreadType<Form>) =>
    eventHandler(() => {
      add(template);
      toggle(false);
    });

  return (
    <Dialog open={isOpen}>
      <DialogOverlay />
      <DialogContent showCloseButton={false} className="space-y-5">
        <h4 className="text-2xl font-semibold">Templates</h4>
        <div className="grid w-full grid-cols-4 gap-3">
          {TEMPLATES.map(({ id, icon: Icon, template }) => (
            <div
              key={id}
              onClick={handleSelect(template)}
              onKeyDown={handleSelect(template)}
              className="flex size-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded border p-3 transition-all ease-in-out hover:shadow"
            >
              <Icon size={30} />
              {template.title}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
