"use client";

import {ChartSkeleton} from "@/components/features/ChartSkeleton";
import {CryptoChart} from "@/components/features/CryptoChart";
import {useCompareStore} from "@/modules/compare-store";
import {useFavoritesStore} from "@/modules/favorites-store";
import {
  getCoinChartById,
  getFavoriteCoins,
  getTopCoins,
} from "@/services/api.service";
import {Coin} from "@/types/crypto";
import {useQueries, useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {useMemo, useState} from "react";

import "./style.scss";

type Period = 1 | 7 | 30;
type Filter = "top5" | "favorites" | "comparison";

export default function ChartsPage() {
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get("filter") as Filter) || "top5";

  const [period, setPeriod] = useState<Period>(7);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const {favorites: favoriteIds} = useFavoritesStore();
  const {compareIds} = useCompareStore();

  const {data: topCoins} = useQuery({
    queryKey: ["topCoins", 5],
    queryFn: () => getTopCoins(5),
    staleTime: 1000 * 60 * 5,
  });

  const {data: favoriteCoins} = useQuery({
    queryKey: ["favoriteCoinsData", favoriteIds],
    queryFn: () => getFavoriteCoins(favoriteIds),
    enabled: favoriteIds.length >= 2,
  });

  const coinsIdsToFetch =
    filter === "top5"
      ? topCoins?.map((c) => c.id) || []
      : filter === "favorites"
      ? favoriteIds
      : compareIds;

  const chartQueries = useQueries({
    queries: coinsIdsToFetch.map((id) => ({
      queryKey: ["coinChart", id, period],
      queryFn: () => getCoinChartById(id, period),
    })),
  });

  const isLoading = chartQueries.some((q) => q.isPending);
  const periodLabel = `${period} ${period === 1 ? "Day" : "Days"}`;

  const chartDatasets = useMemo(() => {
    const allAvaliableCoins: Coin[] = [
      ...(topCoins || []),
      ...(favoriteCoins || []),
    ];

    const datasets = chartQueries
      .filter((q) => q.data && q.data.length)
      .map((q, index) => {
        const coinId = coinsIdsToFetch[index];
        const coinInfo = allAvaliableCoins.find((c) => c.id === coinId);
        const lastPrice = q.data?.[q.data.length - 1]?.[1] || 0;

        return {
          label: coinInfo?.name || coinId,
          data: q.data as [number, number][],
          lastPrice: lastPrice,
          marketCap: coinInfo?.market_cap || 0,
        };
      });

    return datasets;
  }, [chartQueries, topCoins, favoriteCoins, coinsIdsToFetch]);

  return (
    <main style={{padding: "1rem"}}>
      <h1>Compare Cryptocurrencies</h1>
      <div className="filtersContainer">
        <div className="filterSection">
          <span style={{marginRight: "10px"}}>Filter by:</span>
          <button
            onClick={() => setFilter("top5")}
            disabled={filter === "top5"}
          >
            Top 5
          </button>
          <button
            onClick={() => setFilter("favorites")}
            disabled={filter === "favorites"}
          >
            Favorites
          </button>
          {compareIds.length >= 2 && (
            <button
              onClick={() => setFilter("comparison")}
              disabled={filter === "comparison"}
            >
              Comparison ({compareIds.length})
            </button>
          )}
        </div>
        <div className="periodSection">
          <span style={{marginRight: "10px"}}>Period:</span>
          <button onClick={() => setPeriod(1)} disabled={period === 1}>
            1D
          </button>
          <button onClick={() => setPeriod(7)} disabled={period === 7}>
            7D
          </button>
          <button onClick={() => setPeriod(30)} disabled={period === 30}>
            1M
          </button>
        </div>
      </div>
      <div style={{height: "70vh"}}>
        {isLoading && <ChartSkeleton />}
        {!isLoading && chartDatasets.length > 0 && (
          <CryptoChart
            chartDatasets={chartDatasets}
            periodLabel={periodLabel}
            yScaleType="logarithmic"
          />
        )}
        {!isLoading && coinsIdsToFetch.length === 0 && (
          <div>
            {filter === "favorites" && "You have no favorite coins yet."}
            {filter === "comparison" &&
              "You have no coins in your comparison list."}
          </div>
        )}
      </div>
    </main>
  );
}
