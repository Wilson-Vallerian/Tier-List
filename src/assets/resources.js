export const tierLabels = [
  { title: "S", bgColor: "purple" },
  { title: "A", bgColor: "red" },
  { title: "B", bgColor: "orange" },
  { title: "C", bgColor: "green" },
  { title: "D", bgColor: "blue" },
  { title: "E", bgColor: "grey" },
];

export const publicAPIs = [
  { category: "anime", link: `https://api.jikan.moe/v4/anime?` }, // q=${query}&limit=4
  { category: "manga", link: `https://api.mangadex.org/manga?` }, // title=${encodeURIComponent(title)}
];
