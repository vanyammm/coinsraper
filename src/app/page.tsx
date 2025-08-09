"use client";

import {useState} from "react";
import {Coin} from "@/types/crypto";
import {CryptoTable} from "@/components/features/CryptoTable";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {fetchPaginatedCoins, getFavoriteCoins} from "@/services/api.service";
import {Search} from "@/components/features/Search";
import {COINS_PER_PAGE} from "@/constants/coindata.constants";
import {useFavoritesStore} from "@/modules/favorites-store";
import {CryptoTableItemSkeleton} from "@/components/features/CryptoTable/CryptoTableItemSkeleton";

export default function Home() {
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const {favorites} = useFavoritesStore();

  const {
    data: allCoinsData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending: isAllCoinsPending,
    status,
  } = useInfiniteQuery<Coin[]>({
    queryKey: ["coins"],
    queryFn: fetchPaginatedCoins,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < COINS_PER_PAGE) {
        return undefined;
      }

      return allPages.length + 1;
    },
    enabled: filter === "all",
  });

  const {data: favoriteCoins, isPending: isFavoritesPending} = useQuery({
    queryKey: ["favoriteCoins"],
    queryFn: () => getFavoriteCoins(favorites),
    enabled: filter === "favorites",
  });

  const coins =
    filter === "all"
      ? allCoinsData?.pages.flatMap((page) => page) || []
      : favoriteCoins || [];

  return (
    <main>
      <Search />
      <div style={{padding: "1rem 0", display: "flex", gap: "1rem"}}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          All Coins
        </button>
        <button
          onClick={() => setFilter("favorites")}
          disabled={filter === "favorites"}
        >
          Favorites
        </button>
      </div>
      <CryptoTable coins={coins || []} isLoading={isAllCoinsPending} />
      {isFetchingNextPage && (
        <div className="tableContainer">
          <table className="table">
            <tbody>
              {Array.from({length: 3}).map((_, index) => (
                <CryptoTableItemSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {filter === "all" && (
        <div
          style={{display: "flex", justifyContent: "center", padding: "2rem"}}
        >
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      )}
    </main>
  );
}
