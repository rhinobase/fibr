import { eventHandler } from "@rafty/shared";
import { Button, classNames } from "@rafty/ui";
import { HiMinus, HiPlus } from "react-icons/hi";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { PiCornersOut } from "react-icons/pi";
import {
  ControlProps,
  Panel,
  useReactFlow,
  useStore,
  useStoreApi,
} from "reactflow";

export type WorkflowControls = ControlProps;

export function WorkflowControls({
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
}: WorkflowControls) {
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
        "flex gap-0.5 rounded-md bg-white p-1 shadow-md",
        className,
      )}
    >
      {showZoom && (
        <>
          <Button
            title="zoom in"
            aria-label="zoom in"
            size="icon"
            variant="ghost"
            className="rounded p-1"
            isDisabled={maxZoomReached}
            onClick={onZoomInHandler}
            onKeyDown={onZoomInHandler}
          >
            <HiPlus />
          </Button>
          <Button
            title="zoom out"
            aria-label="zoom out"
            size="icon"
            variant="ghost"
            className="rounded p-1"
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
          size="icon"
          variant="ghost"
          className="rounded p-1"
          onClick={onFitViewHandler}
        >
          <PiCornersOut className="stroke-[3]" />
        </Button>
      )}
      {showInteractive && (
        <Button
          title="toggle interactivity"
          aria-label="toggle interactivity"
          size="icon"
          variant="ghost"
          className="rounded p-1"
          onClick={onToggleInteractivity}
        >
          {isInteractive ? <HiLockOpen /> : <HiLockClosed />}
        </Button>
      )}
      {children}
    </Panel>
  );
}
