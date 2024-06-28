import {
  useBlocks,
  Canvas as BuilderCanvas,
  CanvasShortcutsWrapper,
  classNames,
  useCanvas,
  useBuilder,
  WorkspaceErrorType,
} from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { forwardRef, useEffect, useMemo, type ReactNode } from "react";
import { DefaultComponent } from "./DefaultComponent";

export const Canvas = forwardRef<HTMLDivElement, BuilderCanvas>(
  ({ className, ...props }, forwardedRef) => {
    const onError = useBuilder((state) => state.onError);
    const { config, validateSchema } = useBlocks(
      ({ config, validateSchema }) => ({
        config,
        validateSchema,
      }),
    );

    const schema = useCanvas(({ schema }) => schema);

    useEffect(() => {
      if (!validateSchema(schema))
        onError?.({ type: WorkspaceErrorType.SCHEMA_NOT_VALID });
    }, [validateSchema, schema, onError]);

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
      <CanvasShortcutsWrapper>
        <FibrProvider plugins={builders}>
          <BuilderCanvas
            {...props}
            className={classNames(
              "bg-secondary-100 dark:bg-secondary-900",
              className,
            )}
            ref={forwardedRef}
          />
        </FibrProvider>
      </CanvasShortcutsWrapper>
    );
  },
);
Canvas.displayName = "Canvas";
