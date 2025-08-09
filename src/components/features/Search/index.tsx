"use client";

import {searchApiCoins} from "@/services/api.service";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Link from "next/link";
import {useCallback, useEffect, useRef, useState} from "react";

import "./style.scss";
import {useFavoritesStore} from "@/modules/favorites-store";
import {SearchResultCoin} from "@/types/crypto";
import {useOnClickOutside} from "@/hooks/useOnClickOutside";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const queryClient = useQueryClient();
  const {favorites, toggleFavorite} = useFavoritesStore();

  const handleToggleFavorite = useCallback(
    (coinId: string) => {
      toggleFavorite(coinId);

      queryClient.invalidateQueries({queryKey: ["favoriteCoins"]});
    },
    [toggleFavorite, queryClient],
  );

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const clearAndClose = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  useOnClickOutside(searchContainerRef, clearAndClose);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1100);

    return () => clearTimeout(handler);
  }, [query]);

  const {data: results, isLoading} = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchApiCoins(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  return (
    <div className="searchContainer" ref={searchContainerRef}>
      <div className="inputWrapper">
        <input
          type="text"
          placeholder="Search for a crypto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={clearAndClose} className="clearButton">
            &times;
          </button>
        )}
      </div>

      {debouncedQuery && (
        <div className="resultsDropdown">
          {isLoading && <div className="resultItem">Loading...</div>}
          {results && results.length === 0 && !isLoading && (
            <div className="resultItem">No results found.</div>
          )}
          {results?.map((coin: SearchResultCoin) => {
            const isFavorite = favorites.includes(coin.id);
            return (
              <div key={coin.id} className="resultItem">
                <Link
                  href={`/coin/${coin.id}`}
                  className="resultLink"
                  onClick={clearAndClose}
                >
                  <img
                    src={coin.thumb}
                    alt={coin.name}
                    width={24}
                    height={24}
                  />
                  <span>
                    {coin.name} ({coin.symbol})
                  </span>
                </Link>

                <span
                  className="favoriteStar"
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleFavorite(coin.id);
                  }}
                >
                  {isFavorite ? "⭐" : "☆"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
