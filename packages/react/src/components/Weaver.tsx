"use client";
import _ from "lodash";
import { useBlueprint } from "../providers";
import { Thread } from "./Thread";

export type Weaver = {
  include?: string | string[];
  exclude?: string | string[];
};

export function Weaver(props: Weaver) {
  const { blueprint } = useBlueprint();

  if (props.include && props.exclude)
    throw new Error("Include and Exclude can't be defined simultaneously!");

  let components = blueprint;

  if (props.include) components = _.pick(components, props.include);
  if (props.exclude) components = _.omit(components, props.exclude);

  return Object.entries(components).map(([name, options]) => (
    <Thread key={name} name={name} {...options} />
  ));
}
