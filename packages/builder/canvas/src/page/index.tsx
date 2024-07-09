import { useClipboard } from "@fibr/builder";
import { WeaverProvider } from "@fibr/react";
import { Canvas, CustomControls } from "@fibr/shared";
import { FormProvider, useForm } from "react-hook-form";
import { Diagram } from "./Diagram";

export type PageCanvas = { componentWrapper?: WeaverProvider["wrapper"] };

export function PageCanvas({ componentWrapper }: PageCanvas) {
  const methods = useForm();
  const { ref } = useClipboard();

  return (
    <FormProvider {...methods}>
      <Canvas ref={ref}>
        <div className="dark:bg-secondary-950 flex h-full w-full bg-white">
          <WeaverProvider wrapper={componentWrapper}>
            <Diagram />
          </WeaverProvider>
        </div>
        <CustomControls />
      </Canvas>
    </FormProvider>
  );
}
