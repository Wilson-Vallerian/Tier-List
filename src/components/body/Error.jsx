export default function Error({ error }) {
  if (error) {
    return <div className="error">{error}</div>;
  }
}
