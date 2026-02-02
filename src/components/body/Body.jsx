import "../../styles/body.css";
// import { useSelector } from "react-redux";
import { selectItems } from "../../selectors/selectors";
import { useEffect, useRef, useState } from "react";
// import TierSetup from "./TierSetup";
// import Tiers from "./Tiers";
import Error from "./Error";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { atom, useAtom, useAtomValue } from "jotai";

const activeDragableAtom = atom();
const defaultDropZones = [
  { id: "S", dragables: [] },
  { id: "A", dragables: [] },
  { id: "B", dragables: [] },
  { id: "C", dragables: [] },
  { id: "D", dragables: [] },
  { id: "free", dragables: selectItems.map((item) => item.id) },
];
const dropzoneIds = defaultDropZones.map((dz) => dz.id);

export default function Body() {
  const [manyTier, setManyTier] = useState(0);
  const [error, setError] = useState(undefined);
  const manyTierRef = useRef(0);
  const lists = selectItems;
  const [dragables, setDragables] = useState(lists);
  const [activeDragable, setActiveDragable] = useAtom(activeDragableAtom);
  const [dropZones, setDropZones] = useState(defaultDropZones);

  function handleConfirm(e) {
    e.preventDefault();
    const value = manyTierRef.current;

    if (!value) {
      setError("Please enter how many tiers you want!");
    }

    if (value < 1 || value > 10) {
      setError("You can only create between 1 to 10 tiers!");
    } else {
      setError(undefined);
      setManyTier(value);
    }
  }

  function handleDragStart(e) {
    const { active } = e;
    const activeDragable = dragables.find(
      (dragable) => dragable.id === active.id,
    );
    setActiveDragable(activeDragable);
  }

  function handleDragOver(e) {
    const { active, over } = e;
    if (!over || !activeDragable) return;

    const activeDragableId = active.id;
    const overId = over.id;

    const currentDropZone = dropZones.find((dz) =>
      dz.dragables.some((dragable) => dragable === activeDragableId),
    );

    if (!currentDropZone) return;
    const currentDropZoneId = currentDropZone.id;

    setDropZones((prev) => {
      // Case 1: Hovering the empty space inside drop zone
      if (dropzoneIds.includes(overId)) {
        const dropZone = prev.find((dz) => dz.id === overId);
        const newDragables = [
          ...dropZone.dragables.filter(
            (dragable) => dragable !== activeDragableId,
          ),
          activeDragableId,
        ];
        return prev.map((dz) => {
          if (dz.id !== overId && dz.id !== currentDropZoneId) return dz;
          if (dz.id === currentDropZoneId && currentDropZoneId !== overId) {
            return {
              ...dz,
              dragables: dz.dragables.filter(
                (dragable) => dragable !== activeDragableId,
              ),
            };
          }
          return { ...dz, dragables: newDragables };
        });
      }

      // Case 2: Re-arranging items in the same row
      else if (
        currentDropZone.dragables.some((dragable) => dragable === overId)
      ) {
        const oldIndex = currentDropZone.dragables.indexOf(activeDragableId);
        const newIndex = currentDropZone.dragables.indexOf(overId);

        if (oldIndex === newIndex) return prev;

        const newDragables = arrayMove(
          currentDropZone.dragables,
          oldIndex,
          newIndex,
        );
        return prev.map((dz) => {
          if (dz.id !== currentDropZoneId) return dz;
          return { ...dz, dragables: newDragables };
        });
      }

      // Case 3: Re-arranging between 2 different rows
      else if (
        !currentDropZone.dragables.some((dragable) => dragable === overId)
      ) {
        const newDropZone = prev.find((dz) =>
          dz.dragables.some((dragable) => dragable === overId),
        );
        if (!newDropZone) return prev;
        const overIndex = newDropZone.dragables.findIndex(
          (dragable) => dragable === overId,
        );
        const newDragables = newDropZone.dragables.toSpliced(
          overIndex,
          0,
          activeDragableId,
        );
        return prev.map((dz) => {
          if (dz.id !== currentDropZoneId && dz.id !== newDropZone.id)
            return dz;
          else if (dz.id === currentDropZoneId) {
            return {
              ...dz,
              dragables: dz.dragables.filter(
                (dragable) => dragable !== activeDragableId,
              ),
            };
          }

          return { ...dz, dragables: newDragables };
        });
      }
      return prev;
    });
  }

  function handleDragEnd(e) {
    setActiveDragable(undefined);
  }

  const freeDropZone = dropZones.find((dz) => dz.id === "free");
  if (!freeDropZone) return null;

  useEffect(() => {
    setDragables(lists);
  }, [lists]);

  return (
    <div className="body">
      <Error error={error} />

      {/* <TierSetup
        manyTier={manyTier}
        manyTierRef={manyTierRef}
        handleConfirm={handleConfirm}
      /> */}
      {/* <Tiers manyTier={manyTier} lists={lists} /> */}

      <div className="tier-wrapper-2">
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {dropZones
            .filter((dz) => dz.id !== "free")
            .map((dz) => (
              <DropZone dropZone={dz} key={dz.id} />
            ))}

          <DropZone dropZone={freeDropZone} isFree={true} />

          <DragOverlay>
            {activeDragable && (
              <div className="tier-item">
                <DragableContent dragable={activeDragable} isDragging={true} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

function Dragable({ dragable }) {
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

function DropZone({ dropZone, isFree = false }) {
  const { id, dragables } = dropZone;
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="drop-zone">
      {!isFree && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "7rem",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "red",
          }}
        >
          {id}
        </div>
      )}

      <div className="">
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

function DragableContent({ dragable, isDragging }) {
  const { id, image } = dragable;
  const activeDragableId = useAtomValue(activeDragableAtom)?.id;
  return (
    <img
      src={image}
      style={{ opacity: isDragging || activeDragableId !== id ? 1 : 0 }}
    />
  );
}
