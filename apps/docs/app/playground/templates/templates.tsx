"use client";
import { type BaseBlockType } from "@fibr/providers";
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
    template: Record<string, BaseBlockType>;
  }[]
> = {
  [Container.FORM]: [
    {
      id: "contact-us",
      name: "Contact Us",
      icon: GoProjectTemplate,
      template: {
        canvas: {
          type: "canvas",
          title: "Contact Us",
        },
        name: {
          type: "string",
          label: "Name",
          description: "Enter your full name",
          parentNode: "canvas",
        },
        email: {
          type: "string",
          inputType: "email",
          label: "Email",
          description: "Enter email id so we can respond to your query",
          prefixIcon: "envelope",
          parentNode: "canvas",
        },
        phone: {
          type: "number",
          label: "Phone Number",
          description: "Enter your 10 digit mobile number",
          parentNode: "canvas",
        },
        message: {
          type: "textarea",
          label: "Message",
          description: "Enter your message here",
          parentNode: "canvas",
        },
      },
    },
    {
      id: "sign-in",
      name: "Sign In",
      icon: GoProjectTemplate,
      template: {
        canvas: {
          type: "canvas",
          title: "Sign In",
        },
        email: {
          type: "string",
          inputType: "email",
          label: "Email",
          description: "Enter your email id",
          required: true,
          prefixIcon: "envelope",
          parentNode: "canvas",
        },
        password: {
          type: "password",
          label: "Password",
          description: "Enter password",
          required: true,
          parentNode: "canvas",
        },
      },
    },
    {
      id: "sign-up",
      name: "Sign Up",
      icon: GoProjectTemplate,
      template: {
        canvas: {
          type: "canvas",
          title: "Sign Up",
        },
        name: {
          type: "string",
          label: "Name",
          required: true,
          parentNode: "canvas",
        },
        email: {
          type: "string",
          inputType: "email",
          label: "Email",
          required: true,
          prefixIcon: "envelope",
          parentNode: "canvas",
        },
        password: {
          type: "password",
          label: "Create a Password",
          required: true,
          parentNode: "canvas",
        },
        confirm_password: {
          type: "password",
          label: "Confirm Password",
          required: true,
          parentNode: "canvas",
        },
      },
    },
    {
      id: "custom",
      name: "Custom Form",
      icon: FiArrowRight,
      template: {
        canvas: {
          type: "canvas",
          title: "Custom",
        },
      },
    },
  ],
  [Container.WORKFLOW]: [
    {
      id: "custom",
      name: "Custom Flow",
      icon: FiArrowRight,
      template: {},
    },
  ],
  [Container.PAGE]: [
    {
      id: "custom",
      name: "Custom Page",
      icon: FiArrowRight,
      template: {
        canvas: {
          type: "page",
          position: { x: 920, y: 440 },
          width: 1920,
          height: 1080,
        },
      },
    },
  ],
};
