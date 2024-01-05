import { Button as RaftyButton } from "@rafty/ui";

export type Button = Pick<RaftyButton, "name" | "rightIcon">;

export function Button({ name, rightIcon }: Button) {
  return (
    <RaftyButton
      rightIcon={rightIcon}
      className="dark:!bg-primary-400/10 dark:!text-primary-400 dark:!ring-primary-400/20 dark:hover:!bg-primary-400/10 dark:hover:!text-primary-300 dark:hover:!ring-primary-300 inline-flex justify-center gap-0.5 overflow-hidden !rounded-full !bg-zinc-900 !px-3 !py-1 text-sm font-medium !text-white transition hover:!bg-zinc-700 dark:!ring-1 dark:!ring-inset"
    >
      {name}
    </RaftyButton>
  );
}
