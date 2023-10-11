import { FFormType } from "@fiber/core";
import { create } from "zustand";
import { FieldsType } from "../types";

export type BlueprintStoreState<T> = {
  blueprint: FFormType<T>;
  components: Record<string, (props: FieldsType) => JSX.Element>;
};

export const createBlueprintStore = <T>(props: BlueprintStoreState<T>) => {
  const { blueprint, components } = props;

  return create<BlueprintStoreState<T>>(() => ({
    blueprint,
    components,
  }));
};
