import {COINS_PER_PAGE} from "@/constants/coindata.constants";
import {Coin, CoinDetails} from "@/types/crypto";
import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export async function getCoinsMarket({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<Coin[]> {
  try {
    const response = await fetch(
      `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${COINS_PER_PAGE}&page=${pageParam}`,
      {
        next: {revalidate: 60},
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch market data. Status: ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}

export async function getCoinDetails(id: string): Promise<CoinDetails> {
  try {
    const response = await fetch(`${API_URL}/coins/${id}`, {
      next: {revalidate: 120},
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch details for coin ${id}. Status: ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching details for coin ${id}`, error);
    throw error;
  }
}

export async function getCoinChartData(id: string) {
  try {
    const response = await fetch(
      `${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`,
      {
        next: {revalidate: 300},
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch chart data for coin ${id}. Status: ${response.status}`,
      );
    }

    const data = await response.json();

    return data.prices;
  } catch (error) {
    console.error(`Error fetching chart data for coin ${id}:`, error);
    throw error;
  }
}

export async function searchCoins(query: string) {
  if (!query) return [];
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`);
    return response.data.coins;
  } catch (error) {
    console.error("Error searching coins:", error);
    return [];
  }
}

export async function getCoinsByIds(ids: string[]): Promise<Coin[]> {
  if (!ids.length) return [];

  const idsString = ids.join(",");

  try {
    const response = await axios.get<Coin[]>(
      `${API_URL}/coins/markets?vs_currency=usd&ids=${idsString}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching coins by IDs:", error);
    return [];
  }
}
