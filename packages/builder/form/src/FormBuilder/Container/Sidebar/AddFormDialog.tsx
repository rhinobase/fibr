import { useCanvas } from "@fibr/providers";
import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTrigger,
  ErrorMessage,
  FieldControl,
  InputField,
} from "@rafty/ui";
import { useForm } from "react-hook-form";
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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
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
      <FieldControl name="title" isInvalid={errors.title !== null} isRequired>
        <InputField size="sm" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </FieldControl>
      <div className="flex items-center justify-end">
        <Button colorScheme="primary" size="sm" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}
