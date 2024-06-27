import { type ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import { Env, classNames, eventHandler, useBuilder } from "@fibr/builder";
import { useEffect } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { PiCornersOut } from "react-icons/pi";
import {
  type ControlProps,
  Panel,
  useReactFlow,
  useStore,
  useStoreApi,
} from "reactflow";

export type Controls = ControlProps;

export function Controls({
  showZoom = true,
  showFitView = true,
  showInteractive = true,
  fitViewOptions,
  onZoomIn,
  onZoomOut,
  onFitView,
  onInteractiveChange,
  children,
  position = "bottom-center",
  "aria-label": ariaLabel = "React Flow controls",
  style,
  ...props
}: Controls) {
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
      style={{
        display: "flex",
        gap: 2,
        borderRadius: 8,
        padding: 4,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "white",
        ...style,
      }}
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
          <PiCornersOut strokeWidth={3} />
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

function Button({ size = "sm", variant = "ghost", ...props }: ButtonProps) {
  return <ChakraButton {...props} p={1} size={size} variant={variant} />;
}
