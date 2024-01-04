"use client";
import _ from "lodash";
import { RenderField } from "./RenderField";
import { useBlueprint } from "./providers";

export type Fields = {
  include?: string | string[];
  exclude?: string | string[];
};

export function Fields(props: Fields) {
  const { blueprint } = useBlueprint();

  if (props.include && props.exclude)
    throw new Error("Include and Exclude can't be defined simultaneously!");

  let fields = blueprint;

  if (props.include) fields = _.pick(fields, props.include);
  if (props.exclude) fields = _.omit(fields, props.exclude);

  return Object.entries(fields).map(([name, field]) => (
    <RenderField key={name} name={name} {...field} />
  ));
}
