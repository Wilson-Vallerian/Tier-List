import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) {
        setResults(() => []);
        return;
      }

      const req = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=4`,
      );
      if (!req.ok) {
        throw new Error("Failed to request data");
      }
      const data = await req.json();
      setResults(() => data.data);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="search-bar">
      <IoSearch />
      <input
        type="text"
        placeholder="search anime..."
        onChange={(e) => setQuery(() => e.target.value)}
      />

      {results.length > 0 && (
        <div className="searched-data">
          {results.map((result, i) => {
            console.log(result);
            return (
              <div
                key={result.images.jpg.image_url}
                className={`searched-item ${i % 2 === 0 ? "even" : "odd"}`}
              >
                <img src={result.images.jpg.image_url} />
                <div className="item-description">
                  <p>{result.titles[0].title}</p>
                  <p>{result.score}</p>
                  <p>{result.aired.string}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
