import { BezierEdge, type BezierEdgeProps } from "reactflow";
import { useHover } from "@uidotdev/usehooks";
import { classNames } from "@rafty/ui";
import "./style.css";

export function CustomEdge(props: BezierEdgeProps) {
  const [ref, hovering] = useHover();

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
