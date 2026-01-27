import * as Redux from "redux";

const initialState = {
  unplaced: [],
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        unplaced: [...state.unplaced, action.payload],
      };

    case "MOVE_ITEM":
      return;

    default:
      return state;
  }
};

const store = Redux.createStore(listsReducer);

export default store;
