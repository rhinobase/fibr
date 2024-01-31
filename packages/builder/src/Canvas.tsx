import { Button } from "@rafty/ui";
import { PropsWithChildren } from "react";
import { FaExpand, FaLock, FaMinus, FaPlus } from "react-icons/fa";
import { Panel } from "react-resizable-panels";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import { useBuilder } from "./providers";

const PANEL_PROPS = {
  order: 1,
  minSize: 50,
  defaultSize: 80,
  id: "canvas",
};

export function Canvas({ children }: PropsWithChildren) {
  const {
    config: { enableZooming },
  } = useBuilder();

  if (enableZooming)
    return (
      <TransformWrapper
        wheel={{ activationKeys: ["Shift"] }}
        doubleClick={{ mode: "reset" }}
      >
        <Panel {...PANEL_PROPS}>
          <div className="relative h-full">
            <TransformComponent
              wrapperClass="!h-full !w-full"
              contentClass="!h-full !w-full"
            >
              <div className="bg-secondary-100 flex h-full flex-1 items-start justify-center overflow-y-auto py-10">
                {children}
              </div>
            </TransformComponent>
            <Controls />
          </div>
        </Panel>
      </TransformWrapper>
    );

  return (
    <Panel
      {...PANEL_PROPS}
      className="bg-secondary-100 flex h-full items-start justify-center overflow-y-auto py-10"
    >
      {children}
    </Panel>
  );
}

function Controls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-4 left-4 border">
      <ZoomingButton onClick={() => zoomIn(0.3)}>
        <FaPlus size={15} />
      </ZoomingButton>
      <ZoomingButton onClick={() => zoomOut(0.3)}>
        <FaMinus size={15} />
      </ZoomingButton>
      <ZoomingButton onClick={() => resetTransform()}>
        <FaExpand size={15} />
      </ZoomingButton>
      <ZoomingButton>
        <FaLock size={15} />
      </ZoomingButton>
    </div>
  );
}

function ZoomingButton(props: Button) {
  return (
    <Button
      {...props}
      className="rounded-none ring-offset-0 focus:ring-0"
      size="icon"
      variant="ghost"
    />
  );
}
