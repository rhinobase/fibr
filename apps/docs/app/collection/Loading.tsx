import { Spinner } from "@rafty/ui";

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-2">
      <Spinner size="sm" />
      <p className="font-medium opacity-60">Initializing Editor</p>
    </div>
  );
}
