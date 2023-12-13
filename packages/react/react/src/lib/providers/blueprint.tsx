"use client";
import type { FFormType } from "@fibr/core";
import React from "react";
import { FieldValues, Resolver } from "react-hook-form";

export type BlueprintContext<T extends FieldValues = any> = {
  readonly blueprint: FFormType<T, Resolver<T, any>>;
};

const BlueprintContext = React.createContext<BlueprintContext>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  blueprint: null,
});

export function BlueprintProvider<T extends FieldValues>({
  children,
  blueprint,
}: { children: React.ReactNode } & BlueprintContext<T>) {
  return (
    <BlueprintContext.Provider value={{ blueprint }}>
      {children}
    </BlueprintContext.Provider>
  );
}

export const useBlueprint = () => React.useContext(BlueprintContext);
