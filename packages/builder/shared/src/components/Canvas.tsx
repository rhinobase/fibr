import { Canvas as BuilderCanvas } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import type { ReactNode } from "react";
import { useSource } from "../providers";

export function Canvas(props: BuilderCanvas) {
  const config = useSource((state) => state.config);

  const builders = Object.entries(config).reduce<
    Record<string, () => ReactNode>
  >((prev, [name, { builder }]) => {
    prev[name] = builder;
    return prev;
  }, {});

  return (
    <FibrProvider plugins={builders}>
      <BuilderCanvas {...props} />
    </FibrProvider>
  );
}
