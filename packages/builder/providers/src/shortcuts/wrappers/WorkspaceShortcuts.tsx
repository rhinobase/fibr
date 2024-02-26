"use client";
import type { PropsWithChildren } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useBuilder } from "../../builder";
import { Env } from "../../utils";

export function WorkspaceShortcutsWrapper({ children }: PropsWithChildren) {
  const { layout, setLayout, setActive, currentEnv, setEnv } = useBuilder(
    ({ layout, setLayout, tabs: { setActive }, env: { current, change } }) => ({
      layout,
      setLayout,
      setActive,
      currentEnv: current,
      setEnv: change,
    }),
  );

  useHotkeys(
    "mod+k",
    () =>
      setLayout({
        commandPalette: !layout.commandPalette,
      }),
    {
      description: "Command palette",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+shift+a",
    () => {
      setActive("palette");
      setLayout({
        sidebar: true,
      });
    },
    {
      description: "Toggle palette",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+shift+d",
    () => {
      setActive("overview");
      setLayout({
        sidebar: true,
      });
    },
    {
      description: "Toggle overview",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+u",
    () => {
      setActive("inspector");
      setLayout({
        sidebar: true,
      });
    },
    {
      description: "Toggle inspector",
      preventDefault: true,
    },
  );

  useHotkeys(
    "mod+alt+enter",
    () =>
      setEnv(currentEnv === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT),
    {
      description: "Toggle preview mode",
    },
  );

  useHotkeys(
    "shift+?",
    () =>
      setLayout({
        shortcutsDialog: !layout.shortcutsDialog,
      }),
    {
      description: "Shortcut dialog",
    },
    [layout.shortcutsDialog],
  );

  useHotkeys("mod+s", () => console.log("Save"), {
    description: "Save",
    preventDefault: true,
  });

  useHotkeys(
    "mod+b",
    () =>
      setLayout({
        sidebar: !layout.sidebar,
      }),
    { description: "Toggle sidebar", preventDefault: true },
    [layout.sidebar],
  );

  return children;
}
