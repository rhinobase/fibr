import { useBlueprint, FieldsType } from "./providers";
import { Kbd } from "@rafty/ui";

export function RenderField(props: FieldsType) {
  const components = useBlueprint((state) => state.components);

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
