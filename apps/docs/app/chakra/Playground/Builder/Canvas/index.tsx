import { useDroppable } from "@dnd-kit/core";
import {
  Canvas as BuilderCanvas,
  mergeRefs,
  useBlocks,
  useCanvas,
  useClipboard,
} from "@fibr/builder";
import { FibrProvider, WeaverProvider, useThread } from "@fibr/react";
import { Kbd, Text, Toast } from "@rafty/ui";
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
      toast.custom(({ visible }) => (
        <Toast
          visible={visible}
          severity="error"
          title="Schema is not valid!"
          message="One or more fields in schema are not available."
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
        className="bg-secondary-100 dark:bg-secondary-900 items-stretch justify-normal"
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
    <Text isMuted className="text-center text-sm">
      Component of type <Kbd>{type}</Kbd> doesn't exist!
    </Text>
  );
}
