export enum Category {
  TEXT_INPUTS = 1,
  NUMBER_INPUTS = 2,
}

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.TEXT_INPUTS]: "Text Inputs",
  [Category.NUMBER_INPUTS]: "Number Inputs",
};
