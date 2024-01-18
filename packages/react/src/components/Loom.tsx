"use client";
import { useWeaver } from "../providers";
import { Thread } from "./Thread";

export function Loom() {
  const { blueprint } = useWeaver();

  return <Thread {...blueprint} />;
}
