export const selectUnplacedItems = (state) =>
  state.lists.filter((item) => item.type === "unplaced");
