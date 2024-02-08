import { Canvas as BuilderCanvas } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { forwardRef, type ElementRef, type ReactNode } from "react";
import { useSource } from "../providers";

export const Canvas = forwardRef<ElementRef<"div">, BuilderCanvas>(
  (props, forwardedRef) => {
    const config = useSource((state) => state.config);

    const builders = Object.entries(config).reduce<
      Record<string, () => ReactNode>
    >((prev, [name, { builder }]) => {
      prev[name] = builder;
      return prev;
    }, {});

    return (
      <FibrProvider plugins={builders}>
        <BuilderCanvas ref={forwardedRef} {...props} />
      </FibrProvider>
    );
  },
);
Canvas.displayName = "Canvas";
