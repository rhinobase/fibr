import { useCanvas } from "@fibr/builder";
import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTrigger,
  FieldWrapper,
  InputField,
} from "@rafty/ui";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

export function AddFormDialog() {
  return (
    <Dialog size="sm">
      <DialogTrigger className="p-1">
        <PlusIcon className="size-4" />
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent className="dark:bg-secondary-900 space-y-2">
        <DialogHeader>Add Form</DialogHeader>
        <AddForm />
      </DialogContent>
    </Dialog>
  );
}

const schema = z.object({
  title: z
    .string()
    .min(4, "Enter valid form name")
    .max(50, "Form name is too long"),
});

function AddForm() {
  const add = useCanvas(({ add }) => add);

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          (data) =>
            add({
              blockData: {
                data,
                type: "canvas",
              },
            }),
          console.error,
        )}
        className="space-y-3"
      >
        <FieldWrapper name="title" isInvalid={errors.title !== null} isRequired>
          <InputField size="sm" {...register("title")} />
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
