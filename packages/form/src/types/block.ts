import type { IconType } from "react-icons/lib";
import { Category } from "../utils";

export type Block<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    type: string;
    category: Category;
    label: string;
    icon: IconType;
    presets?: T;
  };
