import { Button } from "@rafty/ui";
import {
  type FC,
  type PropsWithChildren,
  memo,
  useEffect,
  useState,
} from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { PiCornersOut } from "react-icons/pi";
import {
  ControlProps,
  Panel,
  ReactFlowState,
  useReactFlow,
  useStore,
  useStoreApi,
} from "reactflow";
import { shallow } from "zustand/shallow";

const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
  currentZoom: s.transform[2],
});

const Controls: FC<PropsWithChildren<ControlProps>> = ({
  showZoom = true,
  showFitView = true,
  showInteractive = true,
  fitViewOptions,
  onZoomIn,
  onZoomOut,
  onFitView,
  onInteractiveChange,
  children,
  position = "bottom-right",
}) => {
  const store = useStoreApi();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isInteractive, minZoomReached, maxZoomReached, currentZoom } =
    useStore(selector, shallow);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  const onZoomInHandler = () => {
    zoomIn();
    onZoomIn?.();
  };

  const onZoomOutHandler = () => {
    zoomOut();
    onZoomOut?.();
  };

  const onFitViewHandler = () => {
    fitView(fitViewOptions);
    onFitView?.();
  };

  const onToggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });

    onInteractiveChange?.(!isInteractive);
  };

  const current_zoom = Number(currentZoom * 100).toFixed(0);

  return (
    <Panel
      position={position}
      data-testid="rf__controls"
      className="dark:bg-secondary-950 flex gap-2 rounded-md bg-white"
    >
      {showInteractive && (
        <Button
          size="icon"
          variant="outline"
          className="focus:!ring-1"
          onClick={onToggleInteractivity}
          title="toggle interactivity"
          aria-label="toggle interactivity"
        >
          {isInteractive ? <HiLockOpen /> : <HiLockClosed />}
        </Button>
      )}
      {showZoom && (
        <div className="dark:border-secondary-700 border-secondary-300 flex items-center gap-2 rounded-md border">
          <Button
            onClick={onZoomInHandler}
            size="icon"
            variant="ghost"
            className="!rounded-none !rounded-l-md focus:!ring-1"
            title="zoom in"
            aria-label="zoom in"
            disabled={maxZoomReached}
          >
            <HiPlus />
          </Button>
          <p className="text-sm">{current_zoom} %</p>
          <Button
            size="icon"
            variant="ghost"
            className="!rounded-none  !rounded-r-md focus:!ring-1"
            onClick={onZoomOutHandler}
            title="zoom out"
            aria-label="zoom out"
            disabled={minZoomReached}
          >
            <HiMinus />
          </Button>
        </div>
      )}
      {showFitView && (
        <Button
          size="icon"
          variant="outline"
          className="focus:!ring-1"
          onClick={onFitViewHandler}
          title="fit view"
          aria-label="fit view"
        >
          <PiCornersOut className="stroke-3 !text-secondary-950 dark:!text-white" />
        </Button>
      )}
      {children}
    </Panel>
  );
};

Controls.displayName = "Controls";

export default memo(Controls);
