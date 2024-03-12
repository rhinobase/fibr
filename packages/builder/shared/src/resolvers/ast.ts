import type { BlockType } from "@fibr/providers";

export const astResolver = (schema: BlockType[]) =>
  JSON.stringify(schema, null, 2);
