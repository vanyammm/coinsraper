import {Coin, CoinDetails, SearchResultCoin} from "@/types/crypto";
import {QueryFunctionContext} from "@tanstack/react-query";
import axios from "axios";

export const fetchPaginatedCoins = async ({
  pageParam = 1,
}: QueryFunctionContext): Promise<Coin[]> => {
  const {data} = await axios.get<Coin[]>(`/api/coins?page=${pageParam}`);
  return data;
};

export const getTopCoins = async (limit: number): Promise<Coin[]> => {
  const {data} = await axios.get<Coin[]>(`/api/coins?page=1&per_page=${limit}`);
  return data;
};

export const getFavoriteCoins = async (ids: string[]): Promise<Coin[]> => {
  if (!ids.length) return [];

  const {data} = await axios.get<Coin[]>(`/api/coins?ids=${ids.join(",")}`);
  return data;
};

export const getCoinById = async (id: string): Promise<CoinDetails> => {
  const {data} = await axios.get<CoinDetails>(`/api/coins/${id}`);
  return data;
};

export const getCoinChartById = async (
  id: string,
  days: number,
): Promise<[number, number][]> => {
  const {data} = await axios.get(`/api/coins/${id}/market-chart?days=${days}`);
  return data;
};

export const searchApiCoins = async (
  query: string,
): Promise<SearchResultCoin[]> => {
  const {data} = await axios.get(`/api/search?query=${query}`);
  return data;
};
