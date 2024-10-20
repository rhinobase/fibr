import type { BlockType } from "@fibr/builder";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FieldWrapper, Textarea } from "@rafty/ui";
import type { BaseSyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
  onSubmit: (template: BlockType[]) => (event: BaseSyntheticEvent) => void;
};

export function CustomTemplateForm(props: CustomTemplateForm) {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(({ template }, event) => {
          if (event) props.onSubmit(JSON.parse(template))(event);
        }, console.error)}
        className="space-y-3"
      >
        <FieldWrapper name="template">
          <Textarea
            className="h-60"
            placeholder="Paste your schema here..."
            {...register("template")}
          />
        </FieldWrapper>
        <div className="flex flex-row-reverse">
          <Button isLoading={isSubmitting} type="submit" colorScheme="primary">
            Get Started
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
