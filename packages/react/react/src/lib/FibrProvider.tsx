import _ from "lodash";
import { ReactNode } from "react";
import { ComponentsProvider } from "./providers";
import { FieldProps } from "./types";

export type FibrProvider = {
  children: ReactNode;
  plugins?: Record<string, (props: FieldProps) => JSX.Element>[];
  onError?: (errors: unknown) => void;
};

export function FibrProvider({
  children,
  plugins = [],
  onError,
}: FibrProvider) {
  const _components = _.merge({}, ...plugins);

  return (
    <ComponentsProvider components={_components} onError={onError}>
      {children}
    </ComponentsProvider>
  );
}
