"use client";
import _ from "lodash";
import { ComponentsProvider } from "./providers";
import type { FieldProps } from "./types";

export type FibrProvider = {
  children: React.ReactNode;
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
