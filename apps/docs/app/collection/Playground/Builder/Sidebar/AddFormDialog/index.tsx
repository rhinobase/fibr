import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTrigger,
  useBoolean,
} from "@rafty/ui";
import { AddForm } from "./Form";

export function AddFormDialog() {
  const [isOpen, setOpen] = useBoolean();

  return (
    <Dialog size="sm" open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger className="p-1">
        <PlusIcon className="size-4" />
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent className="dark:bg-secondary-900 space-y-2">
        <DialogHeader>Add Form</DialogHeader>
        <AddForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
