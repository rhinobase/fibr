import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { classNames } from "@rafty/ui";
import { PropsWithChildren } from "react";
import { useBlueprint } from "../../providers";
import { QuickActions } from "./QuickActions";
import { ENV, useBuilder } from "@fibr/builder";

export function FieldWrapper({ children }: PropsWithChildren) {
  const { id } = useThread();
  const {
    fields: { select, selected },
  } = useBlueprint();
  const { env } = useBuilder();

  const selectField = eventHandler(
    () => env.current === ENV.DEVELOPMENT && select(id),
  );

  const component = (
    <div
      className={classNames(
        "w-full select-none rounded-md border p-5 text-center",
        selected === id ? "border-primary-500" : "border-secondary-200",
        env.current === ENV.DEVELOPMENT &&
          "cursor-pointer transition-all ease-in-out hover:shadow-md ",
      )}
      onClick={selectField}
      onKeyDown={selectField}
    >
      {children}
    </div>
  );

  if (env.current === ENV.DEVELOPMENT)
    return <QuickActions>{component}</QuickActions>;
  return component;
}
