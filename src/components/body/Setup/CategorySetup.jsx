import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CategorySetup() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function toggleDropDown() {
    setOpen((prev) => !prev);
  }

  function handleDropdownClick(type) {
    setOpen(false);
    dispatch({
      type: "SET_CATEGORY",
      payload: type,
    });
  }

  return (
    <div className="category-setup">
      <button onClick={toggleDropDown} className="category-setup-button">
        Choose Which Type Of Tierlist
      </button>

      {open && (
        <div className={`category-dropdown ${open ? "open" : ""}`}>
          <ul>
            <li onClick={() => handleDropdownClick("anime")}>Anime</li>
            <li onClick={() => handleDropdownClick("manga")}>Manga</li>
            {/* <li onClick={() => handleDropdownClick("movies")}>Movies</li> */}
          </ul>
        </div>
      )}
    </div>
  );
}

// TODO: ENABLE MOVIES API
