export default function TierItem({ item }) {
  return (
    <div className="tier-item">
      <img src={item.image} />
      <p>{item.title}</p>
    </div>
  );
}
