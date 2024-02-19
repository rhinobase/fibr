import type { BlockType } from "@fibr/providers";

export const astResolver = (schema: Record<string, BlockType | undefined>) =>
  JSON.stringify(schema, null, 2);
