import { useState } from "react";
import TierItem from "./TierItem";
export default function Tier({ tierTitle, selectorState, bgColor }) {
  const [title, setTitle] = useState(tierTitle);

  return (
    <div className="tier-wrapper">
      <div className="tier-title" style={{ backgroundColor: bgColor }}>
        <input value={title} onChange={(e) => setTitle(() => e.target.value)} />
      </div>
      <div className="tier-item-wrapper">
        {selectorState.length > 0 &&
          selectorState.map((item, i) => (
            <TierItem key={`${item.title}-${i}`} item={item} />
          ))}
      </div>
    </div>
  );
}

// TODO: ENABLE USER TO MOVE THE LIST ITEM TO OTHER LIST
