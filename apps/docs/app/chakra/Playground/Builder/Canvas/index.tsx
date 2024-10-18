import { Kbd, Text, Toast } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  Canvas as BuilderCanvas,
  WorkspaceErrorType,
  mergeRefs,
  useBlocks,
  useBuilder,
  useCanvas,
  useClipboard,
} from "@fibr/builder";
import { Blueprint, DuckForm, useField } from "duck-form";
import { type ReactNode, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Diagram } from "./Diagram";
import { Controls } from "./Diagram/Controls";
import { NodeWrapper } from "./NodeWrapper";

export function Canvas() {
  const { ref } = useClipboard();
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

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
      toast.custom(() => (
        <Toast
          status="error"
          title="Schema is not valid!"
          description="One or more fields in schema are not available."
        />
      ));
  }, [validateSchema, schema]);

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
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!validateSchema(schema))
      onError({ type: WorkspaceErrorType.SCHEMA_NOT_VALID });
  }, [schema]);

  return (
    <DuckForm components={builders}>
      <BuilderCanvas
        ref={mergeRefs(ref, setNodeRef)}
        style={{
          background: "#f4f4f5",
          alignItems: "stretch",
          justifyContent: "normal",
        }}
        className="bg-secondary-100 dark:bg-secondary-900 flex h-full items-start justify-center overflow-y-auto"
      >
        <Blueprint wrapper={NodeWrapper}>
          <Diagram />
        </Blueprint>
        <Controls />
      </BuilderCanvas>
    </DuckForm>
  );
}

function DefaultComponent() {
  const { type } = useField();

  return (
    <Text opacity={0.6} textAlign="center" fontSize="sm">
      Component of type <Kbd>{type}</Kbd> doesn&apos;t exist!
    </Text>
  );
}
