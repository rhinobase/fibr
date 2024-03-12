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
  classNames,
  useBoolean,
} from "@rafty/ui";
import Fuse, { type RangeTuple } from "fuse.js";
import {
  Fragment,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHotkeysContext } from "react-hotkeys-hook";
import type { Hotkey } from "react-hotkeys-hook/dist/types";
import { Empty } from "./Empty";
import { highlightMatches } from "./HightlightMatches";

const capitalize = (s?: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";

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
      <DialogContent
        showCloseButton={false}
        className="flex min-h-[500px] flex-col gap-6"
      >
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
        {isEmpty ? (
          <Empty
            title="Shortcut Not Found"
            description="Please check your spelling and try again."
            className="flex-1"
          />
        ) : (
          <div className="grid grid-cols-2 items-center gap-1.5">
            {searchResults.map(
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
                  <div className="select-none space-x-1">
                    {isMod && (
                      <KeyComponent>{isMac ? "⌘" : "Ctrl"}</KeyComponent>
                    )}
                    {isAlt && (
                      <KeyComponent>{isMac ? "⌥" : "Alt"}</KeyComponent>
                    )}
                    {isShift && <KeyComponent>⇧</KeyComponent>}
                    <KeyComponent className="capitalize">
                      {capitalize(keys?.join(""))}
                    </KeyComponent>
                  </div>
                </Fragment>
              ),
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

type KeyComponent = PropsWithChildren<Pick<Kbd, "className">>;

function KeyComponent({ children, className }: KeyComponent) {
  return (
    <Kbd
      className={classNames(
        "w-max rounded px-1 py-0.5 text-xs leading-none shadow-none",
        className,
      )}
    >
      {children}
    </Kbd>
  );
}
