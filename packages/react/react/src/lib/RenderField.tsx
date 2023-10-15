import { useComponents } from "./providers";
import { FieldProps } from "./types";

export function RenderField(props: FieldProps) {
  const { components } = useComponents();

  const Field = components[props.field.type];

  // No component found
  if (!Field)
    return (
      <p>
        Field type of <kbd>{props.field.type}</kbd> for the field with name{" "}
        <kbd>{props.name}</kbd> doesn't exist!
      </p>
    );

  // Returning the component
  return <Field {...props} />;
}
