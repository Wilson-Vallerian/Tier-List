import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import DropZone from "./DropZone";
import { selectItems as items } from "../../../selectors/selectors";
import { activeDragableAtom } from "../../../atoms/dragAtoms";
import DragableContent from "./DragableContent";
import { useSelector } from "react-redux";

export default function TierList({ manyTier }) {
  const selectItems = useSelector(items);
  const defaultDropZones = [
    { id: "S", dragables: [], bgColor: "#ff4d4f" },
    { id: "A", dragables: [], bgColor: "#ff7a45" },
    { id: "B", dragables: [], bgColor: "#ffa940" },
    { id: "C", dragables: [], bgColor: "#fadb14" },
    { id: "D", dragables: [], bgColor: "#a0d911" },
    { id: "E", dragables: [], bgColor: "#52c41a" },
    { id: "F", dragables: [], bgColor: "#13c2c2" },
    { id: "G", dragables: [], bgColor: "#1890ff" },
    { id: "H", dragables: [], bgColor: "#722ed1" },
    { id: "I", dragables: [], bgColor: "#595959" },
    { id: "free", dragables: selectItems.map((item) => item.id) },
  ];
  const dropzoneIds = defaultDropZones.map((dz) => dz.id);

  const lists = selectItems;
  const [dragables, setDragables] = useState(lists);
  const [activeDragable, setActiveDragable] = useAtom(activeDragableAtom);
  const [dropZones, setDropZones] = useState(defaultDropZones);

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

  function handleDragEnd() {
    setActiveDragable(undefined);
  }

  const freeDropZone = dropZones.find((dz) => dz.id === "free");
  if (!freeDropZone) return null;

  useEffect(() => {
    setDragables(lists);
  }, [lists]);

  useEffect(() => {
    setDropZones((prev) => {
      const usedIds = new Set(
        prev.filter((dz) => dz.id !== "free").flatMap((dz) => dz.dragables),
      );
      setActiveDragable(undefined);

      return prev.map((dz) =>
        dz.id === "free"
          ? {
              ...dz,
              dragables: selectItems
                .map((item) => item.id)
                .filter((id) => !usedIds.has(id)),
            }
          : dz,
      );
    });
  }, [selectItems, setActiveDragable]);

  return (
    <div className="tier-wrapper">
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {dropZones
          .filter((dz) => dz.id !== "free")
          .map((dz, i) => {
            if (i < manyTier) {
              return <DropZone dropZone={dz} key={dz.id} isOdd={i % 2 === 1} />;
            }
          })}

        <DropZone dropZone={freeDropZone} isFree={true} />

        <DragOverlay>
          {activeDragable && (
            <div className="tier-item">
              <DragableContent
                dragable={activeDragable}
                isDragging={true}
                activeDragableAtom={activeDragableAtom}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
