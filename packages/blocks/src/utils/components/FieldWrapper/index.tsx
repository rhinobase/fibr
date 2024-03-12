import { useThread } from "@fibr/react";
import { FieldControl, Label, Text, classNames } from "@rafty/ui";
import { Fragment, type PropsWithChildren } from "react";
import { FieldErrorMessage } from "./FieldErrorMessage";
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
  className?: FieldControl["className"];
}>;

export function FieldWrapper({ className, children }: FieldWrapper) {
  const {
    id,
    data: { label, description, disabled, hidden, required },
  } = useThread<FieldWrapperProps>();

  const LabelAndDescriptionWrapper =
    label && description
      ? (props: PropsWithChildren) => <div {...props} />
      : Fragment;

  return (
    <TooltipWrapper>
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
