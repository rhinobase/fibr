import { Canvas as BuilderCanvas } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { type ReactNode, forwardRef, useMemo, useEffect } from "react";
import { useBlocks } from "../providers";
import { ShortcutsWrapper, useCanvas } from "@fibr/providers";
import toast from "react-hot-toast";
import { Toast } from "@rafty/ui";
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
