import {
  type BlockType,
  DEFAULT_GROUP,
  groupByParentNode,
} from "@fibr/builder";

export type FieldBlockType = BlockType<{
  // Canvas
  title?: string;
  // Field
  label?: string;
  required?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  placeholder?: string;
  tooltip?: string;
  description?: string;
  defaultValue?: string;
}>;

export function reactHookFormResolver(blocks: FieldBlockType[]) {
  const group = groupByParentNode(blocks);
  const form = group[DEFAULT_GROUP]?.[0];

  if (!form) return "";

  const capitalizedTitle = formatTitle(form?.label ?? "");
  const fields = group[form.id];

  const defaultValues = fields
    ?.reduce<string[]>((prev, { id, ...field }) => {
      if (field?.data?.defaultValue == null) return prev;

      const {
        type,
        data: { defaultValue },
      } = field;

      prev.push(
        `${id}: ${type === "number" ? `${defaultValue}` : `"${defaultValue}"`}`,
      );

      return prev;
    }, [])
    .join(`\n${" ".repeat(6)}`);

  return `// Generated by fibr ${new Date().getFullYear()}
// Check it out at https://fibr.rhinobase.io

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldControl, Label, InputField, Textarea, ErrorMessage, Tooltip, TooltipTrigger, TooltipContent } from "@rafty/ui";

export const schema = z.object({
  ${fields
    ?.map(({ id, ...field }) => generateZodSchema(id, field))
    .join(`\n${" ".repeat(2)}`)}
});

// Generated ${capitalizedTitle} form
export function ${capitalizedTitle}Form() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),${
      defaultValues ? `\n${" ".repeat(4)}${defaultValues}` : ""
    }
  });

  return (
    <form
      onSubmit={handleSubmit(console.log, console.error)}
      className="space-y-3"
    >
      ${fields
        ?.map(({ id, ...field }) => generateFieldComponent(id, field))
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

const generateZodSchema = (
  name: string,
  field?: Omit<FieldBlockType, "id">,
) => {
  const validationType = field?.type === "number" ? "number" : "string";

  return `${name}: z.${validationType}(),`;
};

const generateFieldComponent = (
  name: string,
  field?: Omit<FieldBlockType, "id">,
) => {
  if (!field) return "";

  const { type, data = {} } = field;

  const {
    label,
    required,
    hidden,
    disabled,
    placeholder,
    tooltip,
    description,
  } = data;

  const props = [];

  if (required) props.push("isRequired");
  if (disabled) props.push("isDisabled");
  if (hidden) props.push("hidden");
  if (tooltip) props.push(`tooltip="${tooltip}"`);

  return generateTooltip(
    `<FieldControl name="${name}"${
      props.length > 0 ? ` ${props.join(" ")}` : ""
    }>
        <Label>${label}</Label>
        ${
          description
            ? `<Text className="text-xs font-medium leading-[10px]" isMuted>${description}</Text>`
            : "\r"
        }
        <${
          type === "textarea" ? "Textarea" : "InputField"
        } {...register("${name}")}${
          placeholder ? ` placeholder="${placeholder}"` : ""
        } />
        <ErrorMessage>{errors.${name}?.message as string}</ErrorMessage>
      </FieldControl>`,
    tooltip,
  );
};

function generateTooltip(content: string, tooltip: unknown) {
  if (!tooltip) return content;

  return `<Tooltip>
    <TooltipTrigger>
      ${content}
    </TooltipTrigger>
    <TooltipContent>
      ${tooltip}
    </TooltipContent>
  </Tooltip>`;
}
