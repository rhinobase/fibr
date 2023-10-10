import { classNames } from "@rafty/ui";

export function Prose<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, "as" | "className"> & {
  as?: T;
  className?: string;
}) {
  const Component = as ?? "div";

  return (
    <Component
      className={classNames(className, "prose dark:prose-invert")}
      {...props}
    />
  );
}
