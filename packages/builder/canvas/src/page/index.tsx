import { useClipboard } from "@fibr/builder";
import { Canvas, CustomControls } from "@fibr/shared";
import { Blueprint } from "duck-form";
import { FormProvider, useForm } from "react-hook-form";
import { Diagram } from "./Diagram";

export type PageCanvas = { componentWrapper?: Blueprint<unknown>["wrapper"] };

export function PageCanvas({ componentWrapper }: PageCanvas) {
  const methods = useForm();
  const { ref } = useClipboard();

  return (
    <FormProvider {...methods}>
      <Canvas ref={ref}>
        <div className="dark:bg-secondary-950 flex h-full w-full bg-white">
          <Blueprint wrapper={componentWrapper}>
            <Diagram />
          </Blueprint>
        </div>
        <CustomControls />
      </Canvas>
    </FormProvider>
  );
}
