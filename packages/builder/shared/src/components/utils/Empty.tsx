import { classNames } from "@rafty/ui";
import { HTMLAttributes } from "react";

export type Empty = {
  title: string;
  description: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export function Empty({ title, description, className }: Empty) {
  return (
    <div
      className={classNames(
        "text-secondary-500 flex w-full select-none flex-col items-center justify-center gap-1 p-3 text-center font-medium",
        className,
      )}
    >
      <p className="text-lg">{title}</p>
      <p className="text-sm leading-tight">{description}</p>
    </div>
  );
}
