import type { Modifier } from "@dnd-kit/core";

// Defining a function 'adjustTranslate' with the Modifier type
export const adjustTranslate: Modifier = ({ transform }) => {
  // Adjusting the translateY property of the transform object by subtracting 25 units
  // This modification can be used, for example, to lift an element by 25 pixels when dragging
  return {
    ...transform, // Keeping the other properties of the transform unchanged
    // y: transform.y - 10, // Adjusting the translateY property
  };
};
