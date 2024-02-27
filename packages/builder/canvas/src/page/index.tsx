import { Env, useBuilder } from "@fibr/providers";
import { WeaverProvider } from "@fibr/react";
import { Canvas, CustomControls } from "@fibr/shared";
import type { PropsWithChildren, ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Diagram } from "./Diagram";
import { NodePadding } from "./NodePadding";
import { NodeWrapper } from "./NodeWrapper";
import { useHotkeys } from "react-hotkeys-hook";

const NODE_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: NodeWrapper,
  [Env.PRODUCTION]: NodePadding,
};

export function PageCanvas() {
  const methods = useForm();

  const currentEnv = useBuilder((state) => state.env.current);

  const ref = useHotkeys<HTMLDivElement>("mod+v", (event) => {
    console.log("Pasting");
    // const data = JSON.parse(window.clipboardData.getData("text/plain") ?? "");
    // console.log(data);
    // if (data) add(active.canvas ?? "nodes", data);
  });

  return (
    <FormProvider {...methods}>
      <Canvas ref={ref}>
        <div className="dark:bg-secondary-950 flex h-full w-full bg-white">
          <WeaverProvider wrapper={NODE_WRAPPERS[currentEnv]}>
            <Diagram />
          </WeaverProvider>
        </div>
        <CustomControls />
      </Canvas>
    </FormProvider>
  );
}
