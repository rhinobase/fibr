import type { CanvasType } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorMessage, FieldControl, Textarea } from "@rafty/ui";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  template: z.string().refine((value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return false;
    }
  }, "Invalid JSON"),
});

export type CustomTemplateForm = {
  onSubmit: (
    template: Record<string, ThreadType<CanvasType>>,
  ) => (event: BaseSyntheticEvent) => void;
};

export function CustomTemplateForm(props: CustomTemplateForm) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ template }, event) => {
        if (event) props.onSubmit(JSON.parse(template))(event);
      }, console.error)}
      className="space-y-3"
    >
      <FieldControl name="template">
        <Textarea
          className="h-[186px]"
          placeholder="Paste your schema here..."
          {...register("template")}
        />
        <ErrorMessage>{errors.template?.message as string}</ErrorMessage>
      </FieldControl>
      <div className="flex flex-row-reverse">
        <Button isLoading={isSubmitting} type="submit" colorScheme="primary">
          Get Started
        </Button>
      </div>
    </form>
  );
}
