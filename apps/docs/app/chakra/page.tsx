import dynamic from "next/dynamic";
import { LoadingScreen } from "./Loading";

const Playground = dynamic(() => import("./Playground/index"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function ChakraExamplePage() {
  return <Playground />;
}
