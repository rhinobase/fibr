import { classNames } from "@rafty/ui";
import { useHover } from "@uidotdev/usehooks";
import { BezierEdge, type BezierEdgeProps } from "reactflow";
import "./style.css";
import { useThread } from "@fibr/react";

export function CustomEdge() {
  const [ref, hovering] = useHover();
  const props = useThread<BezierEdgeProps>();

  return (
    <g
      ref={ref}
      className={classNames(
        (props.selected || hovering) && "animated [&>path]:!stroke-primary-500",
        "react-flow__edge react-flow__edge-edge nopan",
      )}
    >
      <BezierEdge {...props} interactionWidth={15} />
    </g>
  );
}
