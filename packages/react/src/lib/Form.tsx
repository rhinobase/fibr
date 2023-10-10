import { forwardRef } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

export type Form = Omit<
  JSX.IntrinsicElements["form"],
  "onValid" | "onInvalid"
> & {
  onValid: SubmitHandler<FieldValues>;
  onInvalid?: SubmitErrorHandler<FieldValues> | undefined;
};

export const Form = forwardRef<HTMLFormElement, Form>(
  ({ onValid, onInvalid, ...props }, forwardedRef) => {
    const { handleSubmit } = useFormContext();

    const { onSubmit = handleSubmit(onValid, onInvalid) } = props;

    return <form {...props} onSubmit={onSubmit} ref={forwardedRef} />;
  },
);
