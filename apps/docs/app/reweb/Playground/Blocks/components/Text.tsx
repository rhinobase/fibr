import { useCanvas } from "@fibr/builder";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/ui";
import { useState } from "react";
import { Wrapper } from "./Wrapper";

export type Text = {
  data: { content?: string };
};

export function Text() {
  const {
    id,
    data: { content },
  } = useThread<Text>();
  const [edit, setEdit] = useState(false);

  const { select, update, selectedBlock } = useCanvas(
    ({ select, update, schema }) => ({
      select,
      update,
      selectedBlock: schema.find((block) => block.id === id),
    }),
  );

  const handleSelect = eventHandler(() =>
    select({
      selectedBlockIds: id,
    }),
  );

  return (
    <Wrapper
      id={id}
      as="span"
      isSelected={selectedBlock?.selected ?? false}
      contentEditable={edit}
      onBlur={(e) => {
        e.stopPropagation();
        update({
          blockId: id,
          updatedValues: { data: { content: e.currentTarget.innerText } },
        });
        setEdit(false);
      }}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setEdit((prev) => !prev);
        }

        handleSelect(e);
      }}
      onDoubleClick={() => setEdit(true)}
    >
      {content}
    </Wrapper>
  );
}
