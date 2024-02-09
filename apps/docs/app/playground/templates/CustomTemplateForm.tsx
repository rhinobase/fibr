import { CanvasType } from "@fibr/providers";
import { ThreadType } from "@fibr/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorMessage, FieldControl, Textarea } from "@rafty/ui";
import { useForm } from "react-hook-form";
import superjson from "superjson";
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
  onSubmit: (template: Map<string, ThreadType<CanvasType>>) => void;
};

export function CustomTemplateForm(props: CustomTemplateForm) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
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
        <Textarea
          className="h-[186px]"
          placeholder="Paste your schema here..."
          {...register("template")}
        />
        <ErrorMessage>{errors.template?.message as string}</ErrorMessage>
      </FieldControl>
      <Button type="submit" className="ml-auto" colorScheme="primary">
        Get Started
      </Button>
    </form>
  );
}
