"use client";
import { useThread } from "../providers/Thread";

export function ComponentNotFound() {
  const { type } = useThread();
  return (
    <p>
      Component of type <kbd>{type}</kbd> doesn't exist!
    </p>
  );
}
