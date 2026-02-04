import { useDispatch, useSelector } from "react-redux";

export default function SearchedItem({ result, i, setQuery }) {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.items);

  function handleClick() {
    const hasExist = lists.some((item) => item.id === result.id);
    if (!hasExist) {
      dispatch({
        type: "ADD_ITEM",
        payload: result,
      });
      setQuery("");
    }
  }

  return (
    <div
      className={`searched-item ${i % 2 === 0 ? "even" : "odd"}`}
      onClick={handleClick}
    >
      <div className="plus_sign">
        <p>+</p>
      </div>
      <img src={result.image || "/no-cover.png"} alt={result.title} />
      <div className="item-description">
        <p>{result.title}</p>
        {result.score !== null && <p>{result.score}</p>}
        <p>{result.meta}</p>
      </div>
    </div>
  );
}
