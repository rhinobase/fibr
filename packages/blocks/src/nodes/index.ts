import { StartNode } from "./Start";
import { EndNode } from "./End";
import { TransitNode } from "./Transit";
import { ConditionNode } from "./Condition";

export const pluginNode = {
  start: StartNode,
  end: EndNode,
  transit: TransitNode,
  condition: ConditionNode,
};
