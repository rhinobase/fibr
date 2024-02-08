"use client";
import { f } from "@fibr/blocks";
import { CanvasType } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";
import { GoProjectTemplate } from "react-icons/go";
import { Container } from "./utils";

export const TEMPLATES: Record<
  Container,
  {
    id: string;
    name: string;
    icon: IconType;
    template: ThreadType<CanvasType>;
  }[]
> = {
  [Container.FORM]: [
    {
      id: "contact-us",
      name: "Contact Us",
      icon: GoProjectTemplate,
      template: f.form({
        title: "Contact Us",
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
      name: "Sign In",
      icon: GoProjectTemplate,
      template: f.form({
        title: "Sign In",
        blocks: new Map(
          Object.entries({
            email: f.string({
              inputType: "email",
              label: "Email",
              description: "Enter your email id",
              required: true,
            }),
            password: f.password({
              label: "Password",
              description: "Enter password",
              required: true,
            }),
          }),
        ),
      }),
    },
    {
      id: "sign-up",
      name: "Sign Up",
      icon: GoProjectTemplate,
      template: f.form({
        title: "Sign Up",
        blocks: new Map(
          Object.entries({
            name: f.string({
              label: "Name",
              required: true,
            }),
            email: f.string({
              inputType: "email",
              label: "Email",
              required: true,
            }),
            password: f.password({
              label: "Create a Password",
              required: true,
            }),
            confirm_password: f.password({
              label: "Confirm Password",
              required: true,
            }),
          }),
        ),
      }),
    },
    {
      id: "custom",
      name: "Custom Form",
      icon: FiArrowRight,
      template: f.form({
        title: "Custom",
        blocks: new Map(Object.entries({})),
      }),
    },
  ],
  [Container.WORKFLOW]: [
    {
      id: "custom",
      name: "Custom Flow",
      icon: FiArrowRight,
      template: f.form({
        title: "Custom",
        blocks: new Map(Object.entries({})),
      }),
    },
  ],
  [Container.PAGE]: [
    {
      id: "custom",
      name: "Custom Page",
      icon: FiArrowRight,
      template: f.form({
        title: "Custom",
        blocks: new Map(Object.entries({})),
      }),
    },
  ],
};
