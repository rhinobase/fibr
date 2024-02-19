import type { BaseBlockType } from "@fibr/providers";

export const astResolver = (
  schema: Record<string, BaseBlockType | undefined>,
) => JSON.stringify(schema, null, 2);
