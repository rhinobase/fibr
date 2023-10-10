import { useBlueprint } from "./providers";
import _ from "lodash";
import { RenderField } from "./RenderField";

type Fields = {
  include?: string[];
  exclude?: string[];
};

export function Fields(props: Fields) {
  const blueprint = useBlueprint((state) => state.blueprint);

  if (props.include && props.exclude)
    throw new Error("Include and Exclude can't be defined simultaneously!");

  let fields;

  if (props.include) fields = _.pick(blueprint.fields, props.include);
  if (props.exclude) fields = _.omit(blueprint.fields, props.exclude);
  else fields = blueprint.fields;

  return Object.entries(fields).map(([name, field], index) => (
    <RenderField key={index} name={name} field={field} />
  ));
}
