import { useThread } from "@fibr/react";
import { FieldControl, Label, Text, classNames } from "@rafty/ui";
import { Fragment, PropsWithChildren } from "react";
import { FieldErrorMessage } from "./FieldErrorMessage";
import { TooltipWrapper, TooltipWrapperProps } from "./TooltipWrapper";

export type FieldWrapperProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = TooltipWrapperProps<
  {
    label?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  } & T
>;

export type FieldWrapper = PropsWithChildren<
  FieldWrapperProps<{ className?: FieldControl["className"] }>
>;

export function FieldWrapper({
  label,
  description,
  disabled,
  hidden,
  required,
  tooltip,
  className,
  children,
}: FieldWrapper) {
  const { id } = useThread<FieldWrapperProps>();

  const LabelAndDescriptionWrapper =
    label && description
      ? ({ children }: PropsWithChildren) => <div>{children}</div>
      : Fragment;

  return (
    <TooltipWrapper tooltip={tooltip}>
      <FieldControl
        name={id}
        className={classNames(hidden && "opacity-40", "gap-2", className)}
        isRequired={required}
        isDisabled={disabled}
      >
        <LabelAndDescriptionWrapper>
          {label && <Label className="leading-3">{label}</Label>}
          {description && (
            <Text className="text-secondary-600 dark:text-secondary-400 text-xs font-medium leading-[10px]">
              {description}
            </Text>
          )}
        </LabelAndDescriptionWrapper>
        {children}
        <FieldErrorMessage name={id} />
      </FieldControl>
    </TooltipWrapper>
  );
}
