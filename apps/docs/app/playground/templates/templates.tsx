"use client";
import { CanvasType } from "@fibr/providers";
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
    template: Record<string, CanvasType>;
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
          blocks: {
            name: {
              type: "string",
              label: "Name",
              description: "Enter your full name",
            },
            email: {
              type: "string",
              inputType: "email",
              label: "Email",
              description: "Enter email id so we can respond to your query",
              prefixIcon: "envelope",
            },
            phone: {
              type: "number",
              label: "Phone Number",
              description: "Enter your 10 digit mobile number",
            },
            message: {
              type: "textarea",
              label: "Message",
              description: "Enter your message here",
            },
          },
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
          blocks: {
            email: {
              type: "string",
              inputType: "email",
              label: "Email",
              description: "Enter your email id",
              required: true,
              prefixIcon: "envelope",
            },
            password: {
              type: "password",
              label: "Password",
              description: "Enter password",
              required: true,
            },
          },
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
          blocks: {
            name: {
              type: "string",
              label: "Name",
              required: true,
            },
            email: {
              type: "string",
              inputType: "email",
              label: "Email",
              required: true,
              prefixIcon: "envelope",
            },
            password: {
              type: "password",
              label: "Create a Password",
              required: true,
            },
            confirm_password: {
              type: "password",
              label: "Confirm Password",
              required: true,
            },
          },
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
          blocks: {},
        },
      },
    },
  ],
  [Container.WORKFLOW]: [
    {
      id: "custom",
      name: "Custom Flow",
      icon: FiArrowRight,
      template: {
        nodes: {
          type: "nodes",
          blocks: {},
        },
        edges: {
          type: "edges",
          blocks: {},
        },
      },
    },
  ],
  [Container.PAGE]: [
    {
      id: "custom",
      name: "Custom Page",
      icon: FiArrowRight,
      template: {
        nodes: {
          type: "nodes",
          blocks: {
            page: {
              type: "page",
              position: { x: 920, y: 440 },
              width: 1920,
              height: 1080,
            },
          },
        },
        edges: {
          type: "edges",
          blocks: {},
        },
      },
    },
  ],
};
