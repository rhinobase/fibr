import { Fragment } from "react";
import { ThreadProvider, useFibr, useWeaver } from "../providers";
import type { ThreadWithIdType } from "../types";

export function Thread<T extends Record<string, unknown>>(
  props: ThreadWithIdType<T>,
) {
  const { wrapper: Wrapper = Fragment } = useWeaver();
  const { components } = useFibr();

  const Component = components[props.type] ?? components.default;

  // Returning the component
  return (
    <ThreadProvider {...props}>
      <Wrapper>
        <Component />
      </Wrapper>
    </ThreadProvider>
  );
}
