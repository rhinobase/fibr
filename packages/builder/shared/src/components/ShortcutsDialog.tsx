"use client";
import { useBuilder } from "@fibr/providers";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  Kbd,
  SearchField,
  useBoolean,
} from "@rafty/ui";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { useHotkeysContext } from "react-hotkeys-hook";

export function ShortcutsDialog() {
  const [isMac, toggleOs] = useBoolean();
  const { hotkeys } = useHotkeysContext();
  const { open, toggle } = useBuilder(({ layout, setLayout }) => ({
    open: layout.shortcutsDialog,
    toggle: (value: boolean) =>
      setLayout({
        shortcutsDialog: value,
      }),
  }));

  useEffect(() => {
    if (navigator) toggleOs(navigator.userAgent.toLowerCase().includes("mac"));
  }, []);

  return (
    <Dialog onOpenChange={toggle} open={open} size="lg">
      <DialogOverlay />
      <DialogContent showCloseButton={false} className="space-y-6">
        <DialogHeader className="flex-row items-center justify-between space-y-0">
          <DialogTitle>Keboard Shortcuts</DialogTitle>
          <div className="flex flex-row-reverse justify-end gap-2">
            <DialogClose asChild>
              <Button size="sm">Close Esc</Button>
            </DialogClose>
            <SearchField className="w-[200px]" size="sm" />
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 items-center gap-1">
          {Object.entries(hotkeys).map(([key, value]) => {
            const isMod = value.mod;
            const isShift = value.shift;
            const isAlt = value.alt;

            return (
              <Fragment key={key}>
                <p className="text-sm font-medium">{value.description}</p>
                <div className="space-x-2">
                  {isMod && <KeyComponent>{isMac ? "⌘" : "Ctrl"}</KeyComponent>}
                  {isAlt && <KeyComponent>{isMac ? "⌥ " : "Alt"}</KeyComponent>}
                  {isShift && <KeyComponent>⇧</KeyComponent>}
                  <KeyComponent>{value.keys}</KeyComponent>
                </div>
              </Fragment>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function KeyComponent({ children }: PropsWithChildren) {
  return <Kbd className="w-max rounded px-1">{children}</Kbd>;
}
