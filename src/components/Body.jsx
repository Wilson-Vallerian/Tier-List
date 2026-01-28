import "../styles/body.css";
import Tier from "./Tier";
import { useSelector } from "react-redux";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { selectUnplacedItems } from "../selectors/selectors";
import { useRef, useState } from "react";
import { tierLabels } from "../assets/resources";

export default function Body() {
  const [manyTier, setManyTier] = useState(0);
  const [error, setError] = useState(undefined);
  const manyTierRef = useRef(0);
  const lists = useSelector(selectUnplacedItems);

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

  function handleConfirm(e) {
    e.preventDefault();
    const value = manyTierRef.current;

    if (!value) {
      setError("Please enter how many tiers you want.");
    }

    if (value < 1 || value > 10) {
      setError("You can create between 1 and 10 tiers.");
    } else {
      setError(undefined);
      setManyTier(value);
    }
  }

  return (
    <div className="body">
      {!manyTier && (
        <div className="tier-setup">
          <input
            placeholder="How Many tier?"
            type="number"
            onChange={(e) => (manyTierRef.current = Number(e.target.value))}
          />
          <button onClick={handleConfirm}>confirm</button>
        </div>
      )}

      {error ? <div>{error}</div> : null}

      {manyTier > 0 && (
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
      )}
    </div>
  );
}
