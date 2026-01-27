import { useDispatch } from "react-redux";

export default function SearchedItem({ result, i }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        title: result.titles[0].title,
        image: result.images.jpg.image_url,
      },
    });
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
