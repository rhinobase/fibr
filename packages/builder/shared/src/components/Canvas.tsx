import { Canvas as BuilderCanvas } from "@fibr/builder";
import { ShortcutsWrapper, useCanvas } from "@fibr/providers";
import { FibrProvider } from "@fibr/react";
import { Toast } from "@rafty/ui";
import { type ReactNode, forwardRef, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useBlocks } from "../providers";
import { DefaultComponent } from "./DefaultComponent";

export const Canvas = forwardRef<HTMLDivElement, BuilderCanvas>(
  (props, forwardedRef) => {
    const { config, validateSchema } = useBlocks(
      ({ config, validateSchema }) => ({
        config,
        validateSchema,
      }),
    );

    const schema = useCanvas(({ schema }) => schema);

    useEffect(() => {
      if (!validateSchema(schema))
        toast.custom(({ visible }) => (
          <Toast
            visible={visible}
            severity="error"
            title="Schema is not valid!"
            message="One or more fields in schema are not available."
          />
        ));
    }, [validateSchema]);

    const builders = useMemo(
      () =>
        Object.entries(config).reduce<Record<string, () => ReactNode>>(
          (prev, [name, { builder }]) => {
            prev[name] = builder;
            return prev;
          },
          { default: DefaultComponent },
        ),
      [config],
    );

    return (
      <ShortcutsWrapper>
        <FibrProvider plugins={builders}>
          <BuilderCanvas ref={forwardedRef} {...props} />
        </FibrProvider>
      </ShortcutsWrapper>
    );
  },
);
Canvas.displayName = "Canvas";
