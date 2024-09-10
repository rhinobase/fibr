import type { BlockType } from "@fibr/builder";

export const astResolver = (schema: BlockType[]) =>
  JSON.stringify(schema, null, 2);
