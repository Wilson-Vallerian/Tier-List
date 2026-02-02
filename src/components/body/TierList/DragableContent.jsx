import { useAtomValue } from "jotai";
import { activeDragableAtom } from "../../../atoms/dragAtoms";

export default function DragableContent({ dragable, isDragging }) {
  const { id, image } = dragable;
  const activeDragableId = useAtomValue(activeDragableAtom)?.id;

  return (
    <div
      className="dragable-content-wrapper"
      style={{ opacity: isDragging || activeDragableId !== id ? 1 : 0 }}
    >
      <img src={image} />
      <p>{dragable.title}</p>
    </div>
  );
}
