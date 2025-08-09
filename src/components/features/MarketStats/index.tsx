import {CoinDetails} from "@/types/crypto";
import "./style.scss";
import {formatCurrency, formatNumber} from "@/utils/utils";
import {useMemo} from "react";

interface MarketStatsProps {
  coin: CoinDetails;
}

export const MarketStats = ({coin}: MarketStatsProps) => {
  const stats = useMemo(
    () => [
      {label: "Market Cap Rank", value: `#${coin.market_cap_rank}`},
      {
        label: "Market Cap",
        value: formatCurrency(coin.market_data.market_cap.usd),
      },
      {label: "24h High", value: formatCurrency(coin.market_data.high_24h.usd)},
      {label: "24h Low", value: formatCurrency(coin.market_data.low_24h.usd)},
      {
        label: "Total Volume",
        value: formatCurrency(coin.market_data.total_volume.usd),
      },
      {
        label: "Circulating Supply",
        value: formatNumber(coin.market_data.circulating_supply),
      },
      {
        label: "Community Sentiment",
        value: `👍 ${coin.sentiment_votes_up_percentage}%`,
      },
    ],
    [coin],
  );

  return (
    <div className="statsContainer">
      {stats.map(({label, value}) => (
        <div key={label} className="statItem">
          <span className="statLabel">{label}</span>
          <span className="statValue">{value}</span>
        </div>
      ))}
    </div>
  );
};
