import ManyFieldSetup from "./ManyFieldSetup";
import "../../../styles/setup.css";
import CategorySetup from "./CategorySetup";

export default function TierSetup({ manyTier, manyTierRef, handleConfirm }) {
  if (!manyTier) {
    return (
      <div className="tier-setup">
        <ManyFieldSetup
          manyTierRef={manyTierRef}
          handleConfirm={handleConfirm}
        />

        <CategorySetup />

        <button className="button" onClick={handleConfirm}>
          confirm
        </button>
      </div>
    );
  }
}
