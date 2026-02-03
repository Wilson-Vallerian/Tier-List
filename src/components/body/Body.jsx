import "../../styles/body.css";
import { useRef, useState } from "react";
import TierSetup from "./TierSetup";
import Error from "./Error";
import TierList from "./TierList/TierList";

export default function Body() {
  const [manyTier, setManyTier] = useState(0);
  const [error, setError] = useState(undefined);
  const manyTierRef = useRef(0);

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

  return (
    <main>
      <div className="body">
        <Error error={error} />

        <TierSetup
          manyTier={manyTier}
          manyTierRef={manyTierRef}
          handleConfirm={handleConfirm}
        />

        {manyTier ? <TierList manyTier={manyTier} /> : undefined}
      </div>
    </main>
  );
}
