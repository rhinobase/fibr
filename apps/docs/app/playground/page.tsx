import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { LoadingScreen } from "./Loading";

const Playground = dynamic(() => import("./Playground"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function PlaygroundPage() {
  return (
    <>
      <Playground />
      <Toaster />
    </>
  );
}
