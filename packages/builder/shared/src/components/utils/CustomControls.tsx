import { Env, useBuilder } from "@fibr/providers";
import { eventHandler } from "@rafty/shared";
import { Button as RaftyButton, classNames } from "@rafty/ui";
import { useEffect } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { PiCornersOut } from "react-icons/pi";
import {
  Panel,
  useReactFlow,
  useStore,
  useStoreApi,
  type ControlProps,
} from "reactflow";

export type CustomControls = ControlProps;

export function CustomControls({
  showZoom = true,
  showFitView = true,
  showInteractive = true,
  fitViewOptions,
  onZoomIn,
  onZoomOut,
  onFitView,
  onInteractiveChange,
  className,
  children,
  position = "bottom-center",
  "aria-label": ariaLabel = "React Flow controls",
  ...props
}: CustomControls) {
  const store = useStoreApi();
  const { isInteractive, minZoomReached, maxZoomReached } = useStore(
    (state) => ({
      isInteractive:
        state.nodesDraggable ||
        state.nodesConnectable ||
        state.elementsSelectable,
      minZoomReached: state.transform[2] <= state.minZoom,
      maxZoomReached: state.transform[2] >= state.maxZoom,
    }),
  );
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const env = useBuilder(({ env }) => env.current);

  useEffect(() => {
    let interactive = true;
    if (env === Env.PRODUCTION) interactive = false;

    store.setState({
      nodesDraggable: interactive,
      nodesConnectable: interactive,
      elementsSelectable: interactive,
    });
  }, [env, store]);

  const onZoomInHandler = eventHandler(() => {
    zoomIn();
    onZoomIn?.();
  });

  const onZoomOutHandler = eventHandler(() => {
    zoomOut();
    onZoomOut?.();
  });

  const onFitViewHandler = eventHandler(() => {
    fitView(fitViewOptions);
    onFitView?.();
  });

  const onToggleInteractivity = eventHandler(() => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });

    onInteractiveChange?.(!isInteractive);
  });

  return (
    <Panel
      {...props}
      position={position}
      aria-label={ariaLabel}
      className={classNames(
        "dark:bg-secondary-950 flex gap-0.5 rounded-md bg-white p-1 shadow-md",
        className,
      )}
    >
      {showZoom && (
        <>
          <Button
            title="zoom in"
            aria-label="zoom in"
            isDisabled={maxZoomReached}
            onClick={onZoomInHandler}
            onKeyDown={onZoomInHandler}
          >
            <HiPlus />
          </Button>
          <Button
            title="zoom out"
            aria-label="zoom out"
            isDisabled={minZoomReached}
            onClick={onZoomOutHandler}
            onKeyDown={onZoomOutHandler}
          >
            <HiMinus />
          </Button>
        </>
      )}
      {showFitView && (
        <Button
          title="fit view"
          aria-label="fit view"
          onClick={onFitViewHandler}
        >
          <PiCornersOut className="stroke-[3]" />
        </Button>
      )}
      {showInteractive && (
        <Button
          title="toggle interactivity"
          aria-label="toggle interactivity"
          onClick={onToggleInteractivity}
        >
          {isInteractive ? <HiLockOpen /> : <HiLockClosed />}
        </Button>
      )}
      {children}
    </Panel>
  );
}

function Button({
  size = "icon",
  variant = "ghost",
  className,
  ...props
}: RaftyButton) {
  return (
    <RaftyButton
      {...props}
      size={size}
      variant={variant}
      className={classNames("rounded p-1", className)}
    />
  );
}
