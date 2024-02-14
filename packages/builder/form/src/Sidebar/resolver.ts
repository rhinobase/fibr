import type { CanvasType } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";

export function reactHookFormResolver(
  schema: Map<string, ThreadType<CanvasType>>,
) {
  return `import { useForm } from "react-hook-forms"`;
}
