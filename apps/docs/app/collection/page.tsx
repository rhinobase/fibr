import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { LoadingScreen } from "./Loading";

const Playground = dynamic(() => import("./Playground/index"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function ChakraExamplePage() {
  return (
    <>
      <Playground />
      <Toaster />
    </>
  );
}
