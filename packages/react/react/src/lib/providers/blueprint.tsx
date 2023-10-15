import { FFormType } from "@fibr/core";
import { ReactNode, createContext, useContext } from "react";
import { FieldValues, Resolver } from "react-hook-form";

export type BlueprintContext<T = any> = {
  blueprint: FFormType<T, Resolver<FieldValues>>;
};

const BlueprintContext = createContext<BlueprintContext>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  blueprint: null,
});

export function BlueprintProvider<T>({
  children,
  blueprint,
}: { children: ReactNode } & BlueprintContext<T>) {
  return (
    <BlueprintContext.Provider value={{ blueprint }}>
      {children}
    </BlueprintContext.Provider>
  );
}

export const useBlueprint = () => useContext(BlueprintContext);
