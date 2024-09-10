"use client";
import { Textarea } from "@rafty/ui";
import { useFormContext } from "react-hook-form";

export function TextSettings() {
  const { register } = useFormContext();

  return <Textarea {...register("data.content")} />;
}
