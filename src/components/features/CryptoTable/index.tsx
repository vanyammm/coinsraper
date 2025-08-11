"use client";

import {Coin} from "@/types/crypto";
import "./style.scss";
import {CryptoTableItem} from "./CryptoTableItem";
import {useMemo, useState} from "react";
import {CryptoTableItemSkeleton} from "./CryptoTableItemSkeleton";
import {tableHeaders} from "@/constants/coindata.constants";

interface CryptoTableProps {
  coins: Coin[];
  isLoading?: boolean;
}

type SortConfig = {
  key: keyof Coin | null;
  direction: "ascending" | "descending";
};

export const CryptoTable = ({coins, isLoading}: CryptoTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "market_cap_rank",
    direction: "ascending",
  });

  const sortedCoins = useMemo(() => {
    const sortableCoins = [...coins];

    if (!sortConfig.key) return sortableCoins;

    const key = sortConfig.key;

    sortableCoins.sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return sortableCoins;
  }, [coins, sortConfig]);

  const requestSort = (key: keyof Coin) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({key, direction});
  };

  const sortableHeaders = tableHeaders.filter((header) => header.key !== null);

  return (
    <div className="tableContainer">
      <div className="mobileSortContainer">
        <div className="sortButtons">
          {sortableHeaders.map((header) => (
            <button
              key={header.label}
              className={`sortButton ${
                sortConfig.key === header.key ? "active" : ""
              }`}
              onClick={() => requestSort(header.key as keyof Coin)}
            >
              {header.label}
              {sortConfig.key === header.key && (
                <span>
                  {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.label}
                onClick={
                  header.key
                    ? () => requestSort(header.key as keyof Coin)
                    : undefined
                }
                className={header.key ? "sortable" : ""}
              >
                {header.label}
                {sortConfig.key === header.key && (
                  <span>
                    {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({length: 20}).map((_, index) => (
              <CryptoTableItemSkeleton key={index} />
            ))
          ) : (
            <>
              {sortedCoins.map((coin) => (
                <CryptoTableItem key={coin.id} coin={coin} />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
