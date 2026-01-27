import { useState } from "react";
export default function Tier({ tierTitle, selectorState, bgColor }) {
  const [title, setTitle] = useState(tierTitle);

  return (
    <div className="tier-wrapper">
      <div className="tier-title" style={{ backgroundColor: bgColor }}>
        <input value={title} onChange={(e) => setTitle(() => e.target.value)} />
      </div>
      <div className="tier-item-wrapper">
        {selectorState.length > 0 &&
          selectorState.map((item, i) => {
            return (
              <div key={`${item.title}-${i}`} className="tier-item">
                <img src={item.image} />
                <p>{item.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
