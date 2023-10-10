import React, { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Form = {
  children: ReactNode;
};

export function Form(props: Form) {
  const { handleSubmit } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(
        (values) => console.log(values),
        (error) => console.error(error),
      )}
      className="space-y-2"
    >
      {props.children}
    </form>
  );
}
