import { useState } from "react";
import SearchedData from "./SearchedData";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(() => e.target.value)}
      />

      <SearchedData query={query} setQuery={setQuery} />
    </div>
  );
}
