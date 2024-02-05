"use client";
import { f } from "@fibr/blocks";
import { GoProjectTemplate } from "react-icons/go";
import { FiArrowRight } from "react-icons/fi";

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
    icon: FiArrowRight,
    template: f.form({
      title: "Custom",
      onSubmit: console.log,
      blocks: new Map(Object.entries({})),
    }),
  },
];
