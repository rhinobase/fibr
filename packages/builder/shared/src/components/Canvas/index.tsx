import {
  Canvas as BuilderCanvas,
  CanvasShortcutsWrapper,
  useBlocks,
  useBuilder,
  useCanvas,
  WorkspaceErrorType,
} from "@fibr/builder";
import { classNames } from "@rafty/ui";
import { DuckForm } from "duck-form";
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

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (!validateSchema(schema))
        onError({ type: WorkspaceErrorType.SCHEMA_NOT_VALID });
    }, [schema]);

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
        <DuckForm
          components={builders}
          generateId={(_, props) => (props.id ? String(props.id) : undefined)}
        >
          <BuilderCanvas
            {...props}
            className={classNames(
              "bg-secondary-100 dark:bg-secondary-900 flex h-full items-start justify-center overflow-y-auto",
              className,
            )}
            ref={forwardedRef}
          />
        </DuckForm>
      </CanvasShortcutsWrapper>
    );
  },
);
Canvas.displayName = "Canvas";
