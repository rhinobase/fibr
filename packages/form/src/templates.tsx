"use client";
import { Form, f } from "@fibr/blocks";
import { useBlueprint } from "./providers";
import { Dialog, DialogContent, DialogOverlay, useBoolean } from "@rafty/ui";
import { GoProjectTemplate } from "react-icons/go";
import { useEffect } from "react";
import { eventHandler } from "@rafty/shared";
import { ThreadType } from "@fibr/react";

export const TEMPLATES = [
  {
    id: "contact-us",
    icon: GoProjectTemplate,
    template: f.form({
      title: "Contact Us",
      onSubmit: console.log,
      blocks: new Map(
        Object.entries({
          name: f.string({
            label: "Name",
            description: "Enter your full name",
          }),
          email: f.string({
            inputType: "email",
            label: "Email",
            description: "Enter email id so we can respond to your query",
          }),
          phone: f.number({
            label: "Phone Number",
            description: "Enter your 10 digit mobile number",
          }),
          message: f.textarea({
            label: "Message",
            description: "Enter your message here",
          }),
        }),
      ),
    }),
  },
  {
    id: "sign-in",
    icon: GoProjectTemplate,
    template: f.form({
      title: "Sign In",
      onSubmit: console.log,
      blocks: new Map(
        Object.entries({
          email: f.string({
            inputType: "email",
            label: "Email",
            description: "Enter your email id",
          }),
          password: f.password({
            label: "Password",
            description: "Enter password",
          }),
        }),
      ),
    }),
  },
  {
    id: "sign-up",
    icon: GoProjectTemplate,
    template: f.form({
      title: "Sign Up",
      onSubmit: console.log,
      blocks: new Map(
        Object.entries({
          name: f.string({
            label: "Name",
          }),
          email: f.string({
            inputType: "email",
            label: "Email",
          }),
          password: f.password({
            label: "Create a Password",
          }),
          confirm_password: f.password({
            label: "Confirm Password",
          }),
        }),
      ),
    }),
  },
  {
    id: "custom",
    icon: GoProjectTemplate,
    template: f.form({
      title: "Custom",
      onSubmit: console.log,
      blocks: new Map(Object.entries({})),
    }),
  },
];

export default function TemplateDialog() {
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
