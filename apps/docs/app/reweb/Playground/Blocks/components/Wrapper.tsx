import { classNames } from "@rafty/ui";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

export type Wrapper = {
  isSelected: boolean;
} & (
  | ({ as: "div" } & HTMLAttributes<HTMLDivElement>)
  | ({ as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ as: "p" } & HTMLAttributes<HTMLParagraphElement>)
  | ({ as: "span" } & HTMLAttributes<HTMLSpanElement>)
);

export function Wrapper({ as, isSelected, className, ...props }: Wrapper) {
  const Component = as;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Component
      {...props}
      onMouseOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={classNames(
        isSelected
          ? "border-primary-500"
          : "hover:border-primary-500 border-transparent",
        "border outline-none",
        className,
      )}
    />
  );
}
