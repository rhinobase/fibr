import { useThread } from "@fibr/react";
import { Kbd, Text } from "@rafty/ui";

export function DefaultComponent() {
  const { type } = useThread();

  return (
    <Text isMuted className="text-center text-sm">
      Component of type <Kbd>{type}</Kbd> doesn't exist!
    </Text>
  );
}
