import { ErrorMessage } from "@hookform/error-message";
import { ErrorMessage as RaftyErrorMessage } from "@rafty/ui";
import { useFormContext } from "react-hook-form";

export type FieldErrorMessage = { name: string };

export function FieldErrorMessage({ name }: FieldErrorMessage) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <RaftyErrorMessage>{message}</RaftyErrorMessage>}
    />
  );
}
