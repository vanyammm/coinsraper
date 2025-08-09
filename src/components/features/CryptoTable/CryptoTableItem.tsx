import {useFavoritesStore} from "@/modules/favorites-store";
import {Coin} from "@/types/crypto";
import {formatCurrency} from "@/utils/utils";
import Image from "next/image";
import "./style.scss";
import Link from "next/link";
import {useQueryClient} from "@tanstack/react-query";

interface CryptoTableItemProps {
  coin: Coin;
}

export const CryptoTableItem = ({coin}: CryptoTableItemProps) => {
  const {favorites, toggleFavorite} = useFavoritesStore();
  const queryClient = useQueryClient();

  const isFavorite = favorites.includes(coin.id);

  const handleToggleFavorite = () => {
    toggleFavorite(coin.id);
    queryClient.invalidateQueries({queryKey: ["favoriteCoins"]});
  };

  return (
    <tr className={isFavorite ? "favorite" : ""}>
      <td className="favoriteCell">
        <span
          onClick={handleToggleFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "⭐" : "☆"}
        </span>
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link href={`/coin/${coin.id}`} className="coinLink">
          <div className="coinInfo">
            <Image
              src={coin.image}
              alt={`${coin.name} Image`}
              width={24}
              height={24}
            />
            <span>{coin.name}</span>
            <span className="coinSymbol">{coin.symbol}</span>
          </div>
        </Link>
      </td>
      <td>{formatCurrency(coin.current_price)}</td>
      <td>
        <span
          className={
            coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </td>
      <td>{formatCurrency(coin.market_cap)}</td>
    </tr>
  );
};
