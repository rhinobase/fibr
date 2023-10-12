import { FFormType } from "@fiber/core";
import { FieldValues, Resolver } from "react-hook-form";
import { create } from "zustand";

export type BlueprintStoreState<T> = {
  blueprint: FFormType<T, Resolver<FieldValues>>;
};

export const createBlueprintStore = <T>(props: BlueprintStoreState<T>) => {
  const { blueprint } = props;

  return create<BlueprintStoreState<T>>(() => ({
    blueprint,
  }));
};
