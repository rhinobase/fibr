import _ from "lodash";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type FieldWrapper = {
  children: ReactNode;
  name: string;
  label?: string;
  description?: string;
};

export function FieldWrapper({
  name,
  children,
  label,
  description,
}: FieldWrapper) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = _.get(errors, name);

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      {description && <p>{description}</p>}
      {children}
      {error && <p>{error.message?.toString()}</p>}
    </>
  );
}
