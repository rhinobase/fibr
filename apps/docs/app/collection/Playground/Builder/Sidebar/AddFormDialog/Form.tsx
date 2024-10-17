import { useCanvas } from "@fibr/builder";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FieldWrapper, InputField } from "@rafty/ui";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  label: z
    .string()
    .min(4, "Enter valid form name")
    .max(50, "Form name is too long"),
});

export type AddForm = {
  onSubmit: () => void;
};

export function AddForm(props: AddForm) {
  const add = useCanvas(({ add }) => add);

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, register } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((values) => {
          add({
            blockData: {
              // @ts-expect-error: The 'label' property does not exist.
              label: values.label,
              type: "canvas",
            },
          });
          props.onSubmit();
        }, console.error)}
        className="space-y-3"
      >
        <FieldWrapper name="label" isRequired>
          <InputField size="sm" {...register("label")} />
        </FieldWrapper>
        <div className="flex items-center justify-end">
          <Button colorScheme="primary" size="sm" type="submit">
            Add
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
