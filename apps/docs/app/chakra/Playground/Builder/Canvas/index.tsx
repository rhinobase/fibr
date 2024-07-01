import { Kbd, Text, Toast } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  Canvas as BuilderCanvas,
  mergeRefs,
  useBlocks,
  useCanvas,
  useClipboard,
} from "@fibr/builder";
import { FibrProvider, WeaverProvider, useThread } from "@fibr/react";
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

  return (
    <FibrProvider plugins={builders}>
      <BuilderCanvas
        ref={mergeRefs(ref, setNodeRef)}
        style={{
          background: "#f4f4f5",
          alignItems: "stretch",
          justifyContent: "normal",
        }}
      >
        <WeaverProvider wrapper={NodeWrapper}>
          <Diagram />
        </WeaverProvider>
        <Controls />
      </BuilderCanvas>
    </FibrProvider>
  );
}

function DefaultComponent() {
  const { type } = useThread();

  return (
    <Text opacity={0.6} textAlign="center" fontSize="sm">
      Component of type <Kbd>{type}</Kbd> doesn&apos;t exist!
    </Text>
  );
}
