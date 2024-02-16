import { Canvas as BuilderCanvas } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { forwardRef, type ReactNode, useMemo } from "react";
import { useBlocks } from "../providers";

export const Canvas = forwardRef<HTMLDivElement, BuilderCanvas>(
  (props, forwardedRef) => {
    const config = useBlocks((state) => state.config);

    const builders = useMemo(
      () =>
        Object.entries(config).reduce<Record<string, () => ReactNode>>(
          (prev, [name, { builder }]) => {
            prev[name] = builder;
            return prev;
          },
          {},
        ),
      [config],
    );

    return (
      <FibrProvider plugins={builders}>
        <BuilderCanvas ref={forwardedRef} {...props} />
      </FibrProvider>
    );
  },
);
Canvas.displayName = "Canvas";
