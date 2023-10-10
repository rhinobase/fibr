import { ErrorMessage, FieldControl, Label, Text, classNames } from "@rafty/ui";
import _ from "lodash";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type FieldWrapper = {
  children: ReactNode;
  className?: string;
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
};

export function FieldWrapper({
  name,
  children,
  label,
  description,
  className,
  required,
}: FieldWrapper) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = _.get(errors, name);

  return (
    <FieldControl
      name={name}
      className={classNames("!gap-2", className)}
      isRequired={required}
    >
      {label && description && (
        <div>
          <Label className="!leading-3">{label}</Label>
          <Text className="text-sm leading-[10px] opacity-70">
            {description}
          </Text>
        </div>
      )}
      {label && !description && <Label className="!leading-3">{label}</Label>}
      {children}
      {error && <ErrorMessage>{error.message?.toString()}</ErrorMessage>}
    </FieldControl>
  );
}
