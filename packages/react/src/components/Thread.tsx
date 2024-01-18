"use client";
import { Fragment } from "react";
import { ThreadProvider, useFibr, useWeaver } from "../providers";
import type { ThreadType } from "../types";
import { ComponentNotFound } from "./ComponentNotFound";

export function Thread<T extends Record<string, unknown>>(
  props: ThreadType<T>,
) {
  const { wrapper: Wrapper = Fragment } = useWeaver();
  const { components } = useFibr();

  const Component = components[props.type] ?? ComponentNotFound;

  // Returning the component
  return (
    <ThreadProvider {...props}>
      <Wrapper>
        <Component />
      </Wrapper>
    </ThreadProvider>
  );
}
