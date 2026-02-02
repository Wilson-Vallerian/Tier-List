import { useSortable } from "@dnd-kit/sortable";
import DragableContent from "./DragableContent";

export default function Dragable({ dragable }) {
  const { id } = dragable;
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <button
      style={style}
      className="tier-item"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <DragableContent dragable={dragable} />
    </button>
  );
}
