"use client";
import { Text } from "@rafty/ui";
import { useThread } from "../providers/Thread";

export function ComponentNotFound() {
  const { type } = useThread();
  return (
    <Text isMuted className="text-center text-sm">
      Component of type <kbd>{type}</kbd> doesn't exist!
    </Text>
  );
}
