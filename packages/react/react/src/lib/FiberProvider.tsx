import { ComponentsProvider, ComponentsStoreState } from "./providers";
import { ReactNode } from "react";
import _ from "lodash";
import { DEFAULT_COMPONENTS } from "./DEFAULT_COMPONENTS";
import { FieldProps } from "./types";

export type FiberProvider = {
  children: ReactNode;
  plugins?: Record<string, (props: FieldProps) => JSX.Element>[];
};

export function FiberProvider({ children, plugins = [] }: FiberProvider) {
  const _components = _.merge(DEFAULT_COMPONENTS, ...plugins);

  return (
    <ComponentsProvider components={_components}>{children}</ComponentsProvider>
  );
}
