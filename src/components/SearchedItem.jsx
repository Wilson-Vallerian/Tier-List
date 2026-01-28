import { useDispatch, useSelector } from "react-redux";

export default function SearchedItem({ result, i }) {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  function handleClick() {
    const payload = {
      id: result.mal_id,
      title: result.titles[0].title,
      image: result.images.jpg.image_url,
      type: "unplaced",
    };

    const hasExist = lists.some((item) => item.id === payload.id);
    if (!hasExist) {
      dispatch({
        type: "ADD_ITEM",
        payload: payload,
      });
    }
  }

  return (
    <div
      className={`searched-item ${i % 2 === 0 ? "even" : "odd"}`}
      onClick={handleClick}
    >
      <img src={result.images.jpg.image_url} />
      <div className="item-description">
        <p>{result.titles[0].title}</p>
        <p>{result.score}</p>
        <p>{result.aired.string}</p>
      </div>
    </div>
  );
}
