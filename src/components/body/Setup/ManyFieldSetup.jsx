export default function ManyFieldSetup({ manyTierRef }) {
  return (
    <div>
      <input
        placeholder="How Many tier?"
        type="number"
        onChange={(e) => (manyTierRef.current = Number(e.target.value))}
      />
    </div>
  );
}
