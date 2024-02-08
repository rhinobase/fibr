import { ThreadType } from "@fibr/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FieldControl, Textarea } from "@rafty/ui";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import z from "zod";

const schema = z.object({
  template: z.string(),
});

export type CustomTemplateForm = {
  onSubmit: (template: ThreadType) => void;
};

export function CustomTemplateForm(props: CustomTemplateForm) {
  const { handleSubmit, register } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ template }) =>
        props.onSubmit(superjson.parse(template)),
      )}
      className="space-y-3"
    >
      <FieldControl name="template">
        <Textarea className="h-[178px]" {...register("template")} />
      </FieldControl>
      <Button type="submit" className="ml-auto" colorScheme="primary">
        Get Started
      </Button>
    </form>
  );
}
