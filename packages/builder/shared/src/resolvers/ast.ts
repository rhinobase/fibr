import type { CanvasType } from "@fibr/providers";

export const astResolver = (schema: Record<string, CanvasType | undefined>) =>
  JSON.stringify(schema, null, 2);
