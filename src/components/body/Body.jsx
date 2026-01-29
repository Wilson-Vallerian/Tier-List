import "../../styles/body.css";
import { useSelector } from "react-redux";
import { selectUnplacedItems } from "../../selectors/selectors";
import { useRef, useState } from "react";
import TierSetup from "./TierSetup";
import Tiers from "./Tiers";
import Error from "./Error";

export default function Body() {
  const [manyTier, setManyTier] = useState(0);
  const [error, setError] = useState(undefined);
  const manyTierRef = useRef(0);
  const lists = useSelector(selectUnplacedItems);

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
    <div className="body">
      <Error error={error} />

      <TierSetup
        manyTier={manyTier}
        manyTierRef={manyTierRef}
        handleConfirm={handleConfirm}
      />

      <Tiers manyTier={manyTier} lists={lists} />
    </div>
  );
}
