import { classNames } from "@rafty/ui";
import { useHover } from "@uidotdev/usehooks";
import { useField } from "duck-form";
import { BezierEdge, type BezierEdgeProps } from "reactflow";
import "./style.css";

export function CustomEdge() {
  const [ref, hovering] = useHover();
  const props = useField<BezierEdgeProps>();

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
