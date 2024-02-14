import type { CanvasType } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";

export function reactHookFormResolver(
  schema: Map<string, ThreadType<CanvasType>>,
) {
  const key = schema.keys().next().value;
  const form = schema.get(key);

  if (!form) return "";

  const capitalizedTitle = formatTitle(form.title);
  const blocks = Array.from(form.blocks.entries());

  const defaultValues = blocks
    .filter(([, { defaultValue }]) => defaultValue)
    .map(
      ([name, { type, defaultValue }]) =>
        `${name}: ${type === "number" ? `${defaultValue}` : `"${defaultValue}"`}`,
    )
    .join(`\n${" ".repeat(6)}`);

  return `// Generated by fibr ${new Date().getFullYear()}
// Check it out at https://fibr.rhinobase.io

import z from "zod";
import { useForm } from "react-hook-forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldControl, Label, InputField, ErrorMessage } from "@rafty/ui";

export const schema = z.object({
  ${blocks.map(([name, field]) => generateZodSchema(name, field)).join(`\n${" ".repeat(2)}`)}
});

// Generated ${capitalizedTitle} form
expost function ${capitalizedTitle}Form() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),${defaultValues ? `\n${" ".repeat(4)}${defaultValues}` : ""}
  });

  return (
    <form
      onSubmit={handleSubmit(console.log, console.error)}
      className="space-y-3"
    >
      ${blocks
        .map(([name, field]) => generateFieldComponent(name, field))
        .join(`\n${" ".repeat(6)}`)}
      <Button isLoading={isSubmitting} type="submit" colorScheme="primary">
        Submit
      </Button>
    </form>
  );
}`;
}

const formatTitle = (s: string) =>
  (s[0].toUpperCase() + s.slice(1)).replace(" ", "");

const generateZodSchema = (name: string, field: ThreadType) => {
  const validationType = field.type === "number" ? "number" : "string";

  return `${name}: z.${validationType}(),`;
};

const generateFieldComponent = (name: string, field: ThreadType) => {
  const {
    label,
    required,
    hidden,
    disabled,
    placeholder,
    tooltip,
    description,
  } = field;

  const props = [];

  if (required) props.push("isRequired");
  if (disabled) props.push("isDisabled");
  if (hidden) props.push("hidden");
  if (placeholder) props.push(`placeholder=${placeholder}`);
  if (tooltip) props.push(`title=${tooltip}`);

  return `<FieldControl name="${name}"${props.length > 0 ? ` ${props.join(" ")}` : ""}>
        <Label>${label}</Label>
        ${description ? `<Text isMuted>${description}</Text>` : ""}
        <InputField {...register("${name}")} />
        <ErrorMessage>{errors.${name}?.message as string}</ErrorMessage>
      </FieldControl>`;
};
