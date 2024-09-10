import { Spinner } from "@rafty/ui";
import { Logo } from "../../components/Logo";

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-baseline gap-1">
        <Logo className="h-8 w-auto" />
        <span className="text-[40px] font-bold italic">Fibr</span>
      </div>
      <div className="fixed bottom-10 left-10 flex items-center gap-2">
        <Spinner size="sm" />
        <p className="font-medium opacity-60">Initializing Editor</p>
      </div>
    </div>
  );
}
