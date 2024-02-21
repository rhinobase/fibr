import { useDroppable } from "@dnd-kit/core";
import { useCanvas } from "@fibr/providers";
import { WeaverProvider } from "@fibr/react";
import { Canvas, WorkflowControls } from "@fibr/shared";
import { eventHandler } from "@rafty/shared";
import { Button, useBoolean } from "@rafty/ui";
import { FormProvider, useForm } from "react-hook-form";
import { HiComputerDesktop, HiDevicePhoneMobile } from "react-icons/hi2";
import { Diagram } from "./Diagram";
import { NodeWrapper } from "./NodeWrapper";

export function PageCanvas() {
  const [isMobile, toggle] = useBoolean(false);
  const methods = useForm();
  const select = useCanvas(({ select }) => select);
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const mobileScreen = eventHandler(() => toggle());

  return (
    <FormProvider {...methods}>
      <Canvas ref={setNodeRef} onClick={() => select({ selectedBlockIds: [] })}>
        <div className="flex h-full w-full bg-white">
          <WeaverProvider wrapper={NodeWrapper}>
            <Diagram />
          </WeaverProvider>
        </div>
        <WorkflowControls>
          <Button
            title="toggle interactivity"
            aria-label="toggle interactivity"
            size="icon"
            variant="ghost"
            className="rounded p-1"
            onClick={mobileScreen}
          >
            {isMobile ? <HiComputerDesktop /> : <HiDevicePhoneMobile />}
          </Button>
        </WorkflowControls>
      </Canvas>
    </FormProvider>
  );
}
