import { useSelector } from "react-redux";
import "../styles/body.css";
import Tier from "./Tier";

export default function Body() {
  const unplaced = useSelector((state) => state.unplaced);

  return (
    <div className="body">
      <Tier selectorState={[]} tierTitle="S" bgColor="yellow" />
      <Tier selectorState={[]} tierTitle="A" bgColor="green" />
      <Tier selectorState={[]} tierTitle="B" bgColor="blue" />
      <Tier selectorState={unplaced} tierTitle="Unplaced" bgColor="red" />
    </div>
  );
}
