import type { IconType } from "react-icons/lib";

export type Block<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    type: string;
    label: string;
    icon: IconType;
    presets?: T;
  };
