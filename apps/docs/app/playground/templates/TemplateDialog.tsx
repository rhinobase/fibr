"use client";
import { type BaseBlockType } from "@fibr/providers";
import { eventHandler } from "@rafty/shared";
import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  Text,
  useBoolean,
} from "@rafty/ui";
import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { CustomTemplateForm } from "./CustomTemplateForm";
import { Switch } from "./Switch";
import { TEMPLATES } from "./templates";

export type TemplateDialog = {
  container: Switch["value"];
  onContainerChange: Switch["onValueChange"];
  onSelect: (template: Record<string, BaseBlockType>) => void;
};

export function TemplateDialog({
  container,
  onContainerChange,
  onSelect,
}: TemplateDialog) {
  const [isOpen, toggle] = useBoolean();
  const [customSchema, setCustomSchema] = useBoolean(false);

  useEffect(() => {
    toggle(true);
  }, [toggle]);

  const handleSelect = (template: Record<string, BaseBlockType>) =>
    eventHandler(() => {
      onSelect(template);
      toggle(false);
    });

  const toggleTemplateMode = eventHandler(() => setCustomSchema());

  return (
    <Dialog open={isOpen}>
      <DialogOverlay />
      {customSchema ? (
        <DialogContent showCloseButton={false} className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTemplateMode}
              onKeyDown={toggleTemplateMode}
              className="p-1"
            >
              <FiArrowLeft size={20} />
            </Button>
            <Switch value={container} onValueChange={onContainerChange} />
          </div>
          <CustomTemplateForm onSubmit={handleSelect} />
        </DialogContent>
      ) : (
        <DialogContent showCloseButton={false} className="space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-semibold leading-tight">Templates</h4>
            <Switch value={container} onValueChange={onContainerChange} />
          </div>
          <div className="grid w-full grid-cols-4 gap-3">
            {TEMPLATES[container].map(({ id, name, icon: Icon, template }) => (
              <div
                key={id}
                role="button"
                tabIndex={0}
                onClick={handleSelect(template)}
                onKeyDown={handleSelect(template)}
                className="flex size-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded border p-3 transition-all ease-in-out hover:shadow"
              >
                <Icon size={30} />
                {name}
              </div>
            ))}
          </div>
          <div className="relative flex w-full items-center">
            <hr className="w-full" />
            <Text className="text-secondary-500 absolute left-1/2 -translate-x-1/2 bg-white px-2 font-semibold leading-none tracking-tight">
              Or
            </Text>
            <hr />
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={toggleTemplateMode}
            onKeyDown={toggleTemplateMode}
            className="border-secondary-400 hover:bg-secondary-100 flex h-[86px] w-full cursor-pointer items-center justify-center rounded-lg border border-dashed transition-all ease-in-out hover:border-solid"
          >
            <Text isMuted>Add Schema</Text>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
