import { useState, useEffect } from "react";
import SearchedItem from "./SearchedItem";
import { useSelector } from "react-redux";
import { publicAPIs } from "../../assets/resources";

export default function SearchedData({ query, setQuery }) {
  const [results, setResults] = useState([]);
  const category = useSelector((state) => state.category);

  useEffect(() => {
    let url = "";
    if (category === "anime") {
      url = `${publicAPIs[0].link}q=${query}&limit=4`;
    }
    if (category === "manga") {
      url = `${publicAPIs[1].link}title=${encodeURIComponent(query)}&limit=4&includes[]=cover_art`;
    }

    const timeout = setTimeout(async () => {
      if (!query) {
        setResults(() => []);
        return;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to request data");
      }
      const data = await res.json();

      const normalized = data.data.map((item) => {
        // Jikan
        if (category === "anime") {
          return {
            id: item.mal_id,
            title: item.titles[0]?.title,
            image: item.images.jpg.image_url,
            meta: item.aired?.string ?? "",
            score: item.score ?? null,
          };
        }

        // Mangadex
        const cover = item.relationships.find((r) => r.type === "cover_art");
        return {
          id: item.id,
          title:
            item.attributes.title.en ?? Object.values(item.attributes.title)[0],
          image: cover
            ? `https://uploads.mangadex.org/covers/${item.id}/${cover.attributes.fileName}.256.jpg`
            : null,
          meta: item.attributes.status ?? "",
          score: null,
        };
      });

      setResults(normalized);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query, category]);

  return (
    <>
      {results.length > 0 && (
        <div className="searched-data">
          {results.map((result, i) => {
            // console.log(result);
            return (
              <SearchedItem
                key={result.id}
                result={result}
                i={i}
                setQuery={setQuery}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
