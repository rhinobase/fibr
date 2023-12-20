/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { FFormType } from "@fibr/core";
import { PropsWithChildren, createContext, useContext } from "react";
import { FieldValues, Resolver } from "react-hook-form";

export type BlueprintContextType<T extends FieldValues> = {
  readonly blueprint: FFormType<T, Resolver<T, unknown>>;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const BlueprintContext = createContext<BlueprintContextType<any>>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  blueprint: null,
});

export function BlueprintProvider<T extends FieldValues>({
  children,
  blueprint,
}: PropsWithChildren<BlueprintContextType<T>>) {
  return (
    <BlueprintContext.Provider value={{ blueprint }}>
      {children}
    </BlueprintContext.Provider>
  );
}

export const useBlueprint = () => useContext(BlueprintContext);
