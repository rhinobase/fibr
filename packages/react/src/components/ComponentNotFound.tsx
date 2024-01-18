"use client";
import type { ThreadType } from "../types";

export function ComponentNotFound(props: ThreadType) {
  return (
    <p>
      Component of type <kbd>{props.type}</kbd> doesn't exist!
    </p>
  );
}
