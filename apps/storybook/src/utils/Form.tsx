import { ReactNode } from "react";
import { Form as FiberForm } from "@fiber/react";

type Form = {
  children: ReactNode;
};

export function Form(props: Form) {
  return (
    <FiberForm
      onValid={(values) => console.log(values)}
      onInvalid={(error) => console.error(error)}
      className="space-y-2"
    >
      {props.children}
    </FiberForm>
  );
}
