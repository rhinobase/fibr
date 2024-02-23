"use client";
import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";
import { GoProjectTemplate } from "react-icons/go";
import type { Node } from "reactflow";
import { Container } from "./utils";

export type TemplateType = Partial<Node>[];

export const TEMPLATES: Record<
  Container,
  {
    id: string;
    name: string;
    icon: IconType;
    template: TemplateType;
  }[]
> = {
  [Container.FORM]: [
    {
      id: "contact-us",
      name: "Contact Us",
      icon: GoProjectTemplate,
      template: [
        { id: "canvas", type: "canvas", data: { title: "Contact Us" } },
        {
          id: "name",
          type: "string",
          data: { label: "Name", description: "Enter your full name" },
          parentNode: "canvas",
        },
        {
          id: "email",
          type: "string",
          data: {
            inputType: "email",
            label: "Email",
            description: "Enter email id so we can respond to your query",
            prefixIcon: "envelope",
          },
          parentNode: "canvas",
        },
        {
          id: "phone",
          type: "number",
          data: {
            label: "Phone Number",
            description: "Enter your 10 digit mobile number",
          },
          parentNode: "canvas",
        },
        {
          id: "message",
          type: "textarea",
          data: { label: "Message", description: "Enter your message here" },
          parentNode: "canvas",
        },
      ],
    },
    {
      id: "sign-up",
      name: "Sign Up",
      icon: GoProjectTemplate,
      template: [
        {
          id: "canvas",
          type: "canvas",
          data: {
            title: "Sign Up",
          },
        },
        {
          id: "name",
          type: "string",
          data: { label: "Name", required: true },
          parentNode: "canvas",
        },
        {
          id: "email",
          type: "string",
          data: {
            inputType: "email",
            label: "Email",
            required: true,
            prefixIcon: "envelope",
          },
          parentNode: "canvas",
        },
        {
          id: "password",
          type: "password",
          data: { label: "Create a Password", required: true },
          parentNode: "canvas",
        },
        {
          id: "confirm_password",
          type: "password",
          data: { label: "Confirm Password", required: true },
          parentNode: "canvas",
        },
      ],
    },
    {
      id: "nested",
      name: "Nested",
      icon: GoProjectTemplate,
      template: [
        {
          id: "canvas",
          type: "canvas",
          data: { title: "Nested" },
        },
        {
          id: "name",
          type: "string",
          data: {
            label: "Student's Name",
            description: "Enter your full name",
          },
          parentNode: "canvas",
        },
        {
          id: "father",
          type: "object",
          data: {
            label: "Father",
            description: "Enter father related information here",
          },
          parentNode: "canvas",
        },
        {
          id: "father_name",
          type: "string",
          data: {
            label: "Name",
            description: "Enter father's name",
          },
          parentNode: "father",
        },
        {
          id: "occupation",
          type: "string",
          data: {
            label: "Occupation",
            description: "Enter father's occupation",
          },
          parentNode: "father",
        },
      ],
    },
    {
      id: "custom",
      name: "Custom Form",
      icon: FiArrowRight,
      template: [
        {
          id: "canvas",
          type: "canvas",
          data: {
            title: "Custom",
          },
        },
      ],
    },
  ],
  [Container.WORKFLOW]: [
    {
      id: "custom",
      name: "Custom Flow",
      icon: FiArrowRight,
      template: [],
    },
  ],
  [Container.PAGE]: [
    {
      id: "custom",
      name: "Custom Page",
      icon: FiArrowRight,
      template: [
        {
          id: "canvas",
          type: "page",
          position: { x: 920, y: 440 },
          width: 1920,
          height: 1080,
          draggable: false,
        },
      ],
    },
  ],
};
