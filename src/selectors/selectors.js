export const selectUnplacedItems = (state) =>
  state.unplacedItems.filter((item) => item.type === "unplaced");
