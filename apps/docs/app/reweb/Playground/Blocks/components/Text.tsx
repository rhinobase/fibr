import { useCanvas } from "@fibr/builder";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/ui";
import { useState } from "react";

export type Text = {
  data: { content?: string };
};

export function Text() {
  const {
    id,
    data: { content },
  } = useThread<Text>();
  const [edit, setEdit] = useState(false);
  const { select, update } = useCanvas(({ select, update, schema }) => ({
    select,
    update,
    selectedBlock: schema.find((block) => block.id === id),
  }));

  const onSelect = eventHandler(() =>
    select({
      selectedBlockIds: id,
    }),
  );

  return (
    <span
      id={id}
      data-id={id}
      className="outline-none"
      contentEditable={edit}
      onBlur={(e) => {
        e.stopPropagation();
        update({
          blockId: id,
          updatedValues: { data: { content: e.currentTarget.innerText } },
        });
        setEdit(false);
      }}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setEdit((prev) => !prev);
        }

        onSelect(e);
      }}
      onDoubleClick={() => setEdit(true)}
    >
      {content}
    </span>
  );
}
