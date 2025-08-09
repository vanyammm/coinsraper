import {create} from "zustand";
import {persist} from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (coinId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (coinId) => {
        const currentFavorites = get().favorites;
        const isFavorite = currentFavorites.includes(coinId);
        if (isFavorite) {
          set({favorites: currentFavorites.filter((id) => id !== coinId)});
        } else {
          set({favorites: [...currentFavorites, coinId]});
        }
      },
    }),
    {
      name: "crypto-favorites-storage",
    },
  ),
);
