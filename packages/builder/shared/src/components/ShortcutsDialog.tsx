import { useBuilder } from "@fibr/providers";
import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "@rafty/ui";
import { useHotkeysContext } from "react-hotkeys-hook";

export function ShortcutsDialog() {
  const { open, toggle } = useBuilder(({ layout, setLayout }) => ({
    open: layout.shortcutsDialog,
    toggle: (value: boolean) =>
      setLayout({
        shortcutsDialog: value,
      }),
  }));
  const { hotkeys } = useHotkeysContext();

  return (
    <Dialog onOpenChange={toggle} open={open}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>Keboard Shortcuts</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
