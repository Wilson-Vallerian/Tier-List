import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { selectItems as items } from "../../../selectors/selectors";
import Dragable from "./Dragable";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function DropZone({ dropZone, isOdd = true, isFree = false }) {
  const selectItems = useSelector(items);
  const { id, dragables } = dropZone;
  const { setNodeRef } = useDroppable({
    id,
  });
  const [title, setTitle] = useState(dropZone.id);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [title]);

  return (
    <div
      className={`drop-zone ${isOdd ? "odd" : "even"}`}
      style={isFree ? { background: "wheat", color: "black" } : null}
    >
      {!isFree && (
        <div className="title" style={{ backgroundColor: dropZone.bgColor }}>
          <textarea
            value={title}
            onChange={(e) => setTitle(() => e.target.value)}
            rows={1}
            ref={textareaRef}
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
