import { Spinner } from "@rafty/ui";
import dynamic from "next/dynamic";

const Playground = dynamic(() => import("./Playground"), {
  ssr: false,
  loading() {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <Spinner size="lg" />
        <p>Initializing Editor</p>
      </div>
    );
  },
});

export default function PlaygroundPage() {
  return <Playground />;
}
