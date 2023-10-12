import { BlueprintProvider, BlueprintStoreState } from "./providers";
import { ReactNode } from "react";
import _ from "lodash";

export type FiberForm<T> = {
  children: ReactNode;
} & Pick<BlueprintStoreState<T>, "blueprint">;

export function FiberForm<T>({ children, blueprint }: FiberForm<T>) {
  return (
    <BlueprintProvider blueprint={blueprint}>{children}</BlueprintProvider>
  );
}
