import { create } from "zustand";
import { FieldProps } from "../../types";

export type ComponentsStoreState = {
  components: Record<string, (props: FieldProps) => JSX.Element>;
};

export const createComponentsStore = (props: ComponentsStoreState) => {
  const { components } = props;

  return create<ComponentsStoreState>(() => ({
    components,
  }));
};
