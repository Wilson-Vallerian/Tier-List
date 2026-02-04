import * as Redux from "redux";

const initialState = {
  category: "anime",
  items: [],
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

const store = Redux.createStore(listsReducer);

export default store;
