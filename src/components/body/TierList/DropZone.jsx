import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { selectItems as items } from "../../../selectors/selectors";
import Dragable from "./Dragable";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropZone({ dropZone, isOdd = true, isFree = false }) {
  const selectItems = useSelector(items);
  const { id, dragables } = dropZone;
  const { setNodeRef } = useDroppable({
    id,
  });
  const [title, setTitle] = useState(dropZone.id);

  return (
    <div
      className={`drop-zone ${isOdd ? "odd" : "even"}`}
      style={isFree ? { background: "wheat", color: "black" } : null}
    >
      {!isFree && (
        <div className="title" style={{ backgroundColor: "red" }}>
          <input
            value={title}
            onChange={(e) => setTitle(() => e.target.value)}
          />
        </div>
      )}

      <div
        className="lists"
        style={isFree ? { paddingLeft: "1rem" } : undefined}
      >
        <SortableContext items={dragables}>
          {dragables.map((dragableId) => {
            const dragable = selectItems.find(
              (dragable) => dragable.id === dragableId,
            );
            if (!dragable) return null;
            return <Dragable key={dragableId} dragable={dragable} />;
          })}
        </SortableContext>
      </div>
      <div ref={setNodeRef} style={{ flex: 1 }} />
    </div>
  );
}
