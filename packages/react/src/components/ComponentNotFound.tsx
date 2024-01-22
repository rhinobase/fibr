"use client";
import { useThread } from "../providers";

export function ComponentNotFound() {
  const { type } = useThread();
  return (
    <p>
      Component of type <kbd>{type}</kbd> doesn't exist!
    </p>
  );
}
