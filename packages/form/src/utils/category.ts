export enum Category {
  PRESENTATION = 1,
  TEXT_INPUTS = 2,
  NUMBER_INPUTS = 3,
}

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.PRESENTATION]: "Presentation",
  [Category.TEXT_INPUTS]: "Text Inputs",
  [Category.NUMBER_INPUTS]: "Number Inputs",
};
