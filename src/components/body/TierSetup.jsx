export default function TierSetup({ manyTier, manyTierRef, handleConfirm }) {
  if (!manyTier) {
    return (
      <div className="tier-setup">
        <input
          placeholder="How Many tier?"
          type="number"
          onChange={(e) => (manyTierRef.current = Number(e.target.value))}
        />
        <button onClick={handleConfirm}>confirm</button>
      </div>
    );
  }
}
