import * as Redux from "redux";

const initialState = {
  lists: [],
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };

    case "MOVE_ITEM":
      return;

    default:
      return state;
  }
};

const store = Redux.createStore(listsReducer);

export default store;
