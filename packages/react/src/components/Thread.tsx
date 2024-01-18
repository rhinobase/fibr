"use client";
import { Fragment } from "react";
import { useFibr, useWeaver } from "../providers";
import type { ThreadType } from "../types";
import { ComponentNotFound } from "./ComponentNotFound";

export function Thread(props?: ThreadType) {
  const { blueprint, wrapper: Wrapper = Fragment } = useWeaver();
  const { components } = useFibr();

  const config = props ?? blueprint;

  const Component = components[config.type] ?? ComponentNotFound;

  // Returning the component
  return (
    <Wrapper {...config}>
      <Component {...config} />
    </Wrapper>
  );
}
