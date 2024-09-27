import {
  Canvas as BuilderCanvas,
  CanvasShortcutsWrapper,
  Env,
  WorkspaceErrorType,
  useBlocks,
  useBuilder,
  useCanvas,
  useClipboard,
} from "@fibr/builder";
import { Kbd, Text, classNames } from "@rafty/ui";
import { Blueprint, DuckForm, useField } from "duck-form";
import type { PropsWithChildren } from "react";
import { type ReactNode, forwardRef, useEffect, useMemo } from "react";
import { FieldPadding } from "./FieldPadding";
import { FieldWrapper } from "./FieldWrapper";
import { FormDisplay } from "./FormDisplay";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: FieldPadding,
};

export function Canvas() {
  const currentEnv = useBuilder((state) => state.env.current);
  const select = useCanvas(({ select }) => select);
  const { ref } = useClipboard();

  const handleSelect = () => select({ selectedBlockIds: null });

  return (
    <FormBuilderCanvas
      ref={ref}
      className="min-h-min py-10"
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <div className="w-[500px] space-y-2 rounded">
        <FormDisplay fieldWrapper={BLOCK_WRAPPERS[currentEnv]} />
      </div>
    </FormBuilderCanvas>
  );
}

export const FormBuilderCanvas = forwardRef<HTMLDivElement, BuilderCanvas>(
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
          <Blueprint>
            <BuilderCanvas
              {...props}
              className={classNames(
                "bg-secondary-100 dark:bg-secondary-900 flex h-full items-start justify-center overflow-y-auto",
                className,
              )}
              ref={forwardedRef}
            />
          </Blueprint>
        </DuckForm>
      </CanvasShortcutsWrapper>
    );
  },
);
FormBuilderCanvas.displayName = "FormBuilderCanvas";

export function DefaultComponent() {
  const { type } = useField();

  return (
    <Text isMuted className="text-center text-sm">
      Component of type <Kbd>{type}</Kbd> doesn&apos;t exist!
    </Text>
  );
}
