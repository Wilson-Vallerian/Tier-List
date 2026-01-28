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
                {console.log(selectorState)}
              </div>
            );
          })}
      </div>
    </div>
  );
}

// TODO: ADD HOVER EFFECT ON ITEM LIST: (+) AND BLUR THE SEARCHED ITEM
// TODO: ENABLE USER TO ADD HOW MANY TIERLIST THEY WANT (MODIFY STORE)
// TODO: ENABLE USER TO MOVE THE LIST ITEM TO OTHER LIST
