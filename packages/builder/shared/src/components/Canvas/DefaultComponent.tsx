import { Kbd, Text } from "@rafty/ui";
import { useField } from "duck-form";

export function DefaultComponent() {
  const { type } = useField();

  return (
    <Text isMuted className="text-center text-sm">
      Component of type <Kbd>{type}</Kbd> doesn't exist!
    </Text>
  );
}
