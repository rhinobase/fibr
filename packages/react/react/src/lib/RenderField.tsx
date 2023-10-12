import { useComponents } from "./providers";
import { Kbd } from "@rafty/ui";
import { FieldProps } from "./types";

export function RenderField(props: FieldProps) {
  const components = useComponents((state) => state.components);

  const Field = components[props.field.type];

  // No component found
  if (!Field)
    return (
      <p>
        Field type of <Kbd>{props.field.type}</Kbd> for the field with name{" "}
        <Kbd>{props.name}</Kbd> doesn't exist!
      </p>
    );

  // Returning the component
  return <Field {...props} />;
}
