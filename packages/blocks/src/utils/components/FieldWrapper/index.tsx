import { useThread } from "@fibr/react";
import { FieldWrapper as RaftyFieldWrapper, classNames } from "@rafty/ui";
import { type PropsWithChildren } from "react";
import { TooltipWrapper } from "./TooltipWrapper";

export type FieldWrapperProps = {
  data: {
    label?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  };
};

export type FieldWrapper = PropsWithChildren<{
  className?: RaftyFieldWrapper["className"];
}>;

export function FieldWrapper({ className, children }: FieldWrapper) {
  const {
    id,
    data: { label, description, disabled, hidden, required },
  } = useThread<FieldWrapperProps>();

  return (
    <TooltipWrapper>
      <RaftyFieldWrapper
        name={id}
        label={label}
        description={description}
        className={classNames(hidden && "opacity-40", "gap-2", className)}
        isRequired={required}
        isDisabled={disabled}
      >
        {children}
      </RaftyFieldWrapper>
    </TooltipWrapper>
  );
}
