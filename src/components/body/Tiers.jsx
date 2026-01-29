import { DndContext, closestCenter } from "@dnd-kit/core";
import { tierLabels } from "../../assets/resources";
import Tier from "./Tier";

export default function Tiers({ manyTier, lists }) {
  const tiers = buildTiers(tierLabels, manyTier);

  function buildTiers(labels, count) {
    const base = labels.slice(0, count);

    if (count <= labels.length) {
      return base;
    }

    const extraCount = count - labels.length;
    const fillers = Array.from({ length: extraCount }, () => ({
      title: "Name Me!",
      bgColor: "grey",
    }));

    return [...base, ...fillers];
  }

  if (manyTier > 0) {
    return (
      <DndContext collisionDetection={closestCenter}>
        {tiers.map((el, i) => {
          return (
            <Tier
              key={`${el.title}-${i}`}
              selectorState={[]}
              tierTitle={el.title}
              bgColor={el.bgColor}
            />
          );
        })}
        <Tier selectorState={lists} tierTitle="Unplaced" bgColor="black" />
      </DndContext>
    );
  }
}
