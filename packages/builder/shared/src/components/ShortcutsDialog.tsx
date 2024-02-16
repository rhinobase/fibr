"use client";
import { useBuilder } from "@fibr/providers";
import Fuse, { type RangeTuple } from "fuse.js";
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
import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHotkeysContext } from "react-hotkeys-hook";
import { Hotkey } from "react-hotkeys-hook/dist/types";
import { Empty, highlightMatches } from "./utils";

export function ShortcutsDialog() {
  const [isMac, toggleOs] = useBoolean();
  const [search, setSearch] = useState("");
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
  }, [toggleOs]);

  const [data, fuse] = useMemo(() => {
    const data = Object.values(hotkeys);
    return [
      data,
      new Fuse(data, {
        keys: ["description"],
        includeMatches: true,
      }),
    ];
  }, [hotkeys]);

  let searchResults: (Hotkey & { matches?: RangeTuple[] })[] = data;
  let isEmpty = false;

  if (search) {
    const results = fuse.search(search);

    if (results.length === 0) isEmpty = true;

    searchResults = results.reduce<typeof searchResults>(
      (prev, { item, matches }) => {
        prev.push({
          ...item,
          matches: matches?.flatMap((match) => match.indices),
        });

        return prev;
      },
      [],
    );
  }

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
            <SearchField
              className="w-[200px]"
              search={search}
              onSearch={setSearch}
              size="sm"
              autoComplete="off"
            />
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 items-center gap-1">
          {isEmpty ? (
            <div className="flex flex-1 flex-col justify-center">
              <Empty
                title="Shortcut Not Found"
                description="Please check your spelling and try again."
              />
            </div>
          ) : (
            searchResults.map(
              (
                {
                  description,
                  mod: isMod,
                  shift: isShift,
                  alt: isAlt,
                  keys,
                  matches,
                },
                index,
              ) => (
                <Fragment key={`${index}-${keys}`}>
                  <p className="text-sm font-medium">
                    {matches
                      ? highlightMatches(description ?? "", matches)
                      : description}
                  </p>
                  <div className="select-none space-x-2">
                    {isMod && (
                      <KeyComponent>{isMac ? "⌘" : "Ctrl"}</KeyComponent>
                    )}
                    {isAlt && (
                      <KeyComponent>{isMac ? "⌥ " : "Alt"}</KeyComponent>
                    )}
                    {isShift && <KeyComponent>⇧</KeyComponent>}
                    <KeyComponent>{keys}</KeyComponent>
                  </div>
                </Fragment>
              ),
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function KeyComponent({ children }: PropsWithChildren) {
  return <Kbd className="w-max rounded px-1">{children}</Kbd>;
}
