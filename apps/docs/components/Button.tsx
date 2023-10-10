import { Button } from "@rafty/ui";
import { ReactElement } from "react";

type ButtonType = {
  name: string;
  righticon?: ReactElement;
};

export default function ButtonClass({ name, righticon }: ButtonType) {
  return (
    <Button
      rightIcon={righticon}
      className="dark:!bg-primary-400/10 dark:!text-primary-400 dark:!ring-primary-400/20 dark:hover:!bg-primary-400/10 dark:hover:!text-primary-300 dark:hover:!ring-primary-300 inline-flex justify-center gap-0.5 overflow-hidden !rounded-full !bg-zinc-900 !px-3 !py-1 text-sm font-medium !text-white transition hover:!bg-zinc-700 dark:!ring-1 dark:!ring-inset"
    >
      {name}
    </Button>
  );
}
