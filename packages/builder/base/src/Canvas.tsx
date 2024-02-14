import {
  LockClosedIcon,
  MinusIcon,
  PlusIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, classNames } from "@rafty/ui";
import { forwardRef, type ElementRef, type HTMLAttributes } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import { useBuilder } from "./providers";

export type Canvas = HTMLAttributes<HTMLDivElement>;

export const Canvas = forwardRef<ElementRef<"div">, Canvas>(
  ({ children, className, ...props }, forwardedRef) => {
    const enableZooming = useBuilder((state) => state.config.enableZooming);

    if (enableZooming)
      return (
        <TransformWrapper
          wheel={{ activationKeys: ["Shift"] }}
          doubleClick={{ mode: "reset" }}
        >
          <div className="relative h-full">
            <TransformComponent
              wrapperClass="!h-full !w-full"
              contentClass="!h-full !w-full"
            >
              <div
                {...props}
                className={classNames(
                  "bg-secondary-100 flex h-full flex-1 items-start justify-center overflow-y-auto py-10",
                  className,
                )}
                ref={forwardedRef}
              >
                {children}
              </div>
            </TransformComponent>
            <Controls />
          </div>
        </TransformWrapper>
      );
    return (
      <div
        {...props}
        className={classNames(
          "bg-secondary-100 flex h-full items-start justify-center overflow-y-auto",
          className,
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
Canvas.displayName = "Canvas";

function Controls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-4 left-4 border">
      <ZoomingButton onClick={() => zoomIn(0.3)}>
        <PlusIcon className="size-4" />
      </ZoomingButton>
      <ZoomingButton onClick={() => zoomOut(0.3)}>
        <MinusIcon className="size-4" />
      </ZoomingButton>
      <ZoomingButton onClick={() => resetTransform()}>
        <ViewfinderCircleIcon className="size-4" />
      </ZoomingButton>
      <ZoomingButton>
        <LockClosedIcon className="size-4" />
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
