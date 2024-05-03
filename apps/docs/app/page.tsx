import { Logo } from "@fibr/builder";
import { Spinner } from "@rafty/ui";
import dynamic from "next/dynamic";

const Playground = dynamic(() => import("./Playground"), {
  ssr: false,
  loading() {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Logo className="h-8" />
        <span className="text-4xl font-semibold italic leading-none">Fibr</span>
        <div className="fixed bottom-10 left-10 flex items-center gap-2">
          <Spinner size="sm" />
          <p className="font-medium">Initializing Editor</p>
        </div>
      </div>
    );
  },
});

export default function PlaygroundPage() {
  return <Playground />;
}
