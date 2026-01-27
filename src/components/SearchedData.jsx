import { useState, useEffect } from "react";
import SearchedItem from "./SearchedItem";

export default function SearchedData({ query }) {
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
    <>
      {results.length > 0 && (
        <div className="searched-data">
          {results.map((result, i) => {
            console.log(result);
            return (
              <SearchedItem
                key={result.images.jpg.image_url}
                result={result}
                i={i}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
