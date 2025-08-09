"use client";

import {CryptoChart} from "@/components/features/CryptoChart";
import {getCoinById, getCoinChartById} from "@/services/api.service";
import {CoinDetails} from "@/types/crypto";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import {useParams} from "next/navigation";

import "./style.scss";
import {MarketStats} from "@/components/features/MarketStats";
import {CoinDetailPageSkeleton} from "./CoinDetailPageSkeleton";

export default function CoinDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: coin,
    isPending: isCoinPending,
    isError,
  } = useQuery<CoinDetails>({
    queryKey: ["coin", id],
    queryFn: () => getCoinById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const {data: chartData, isPending: isChartPending} = useQuery({
    queryKey: ["coinChart", id],
    queryFn: () => getCoinChartById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isCoinPending || isChartPending) {
    return <CoinDetailPageSkeleton />;
  }

  if (isError) return <div>Failed to load coin data.</div>;
  if (!coin) return <div>Coin not found.</div>;

  return (
    <main style={{padding: "2rem"}}>
      <div className="coinHeader">
        <Image src={coin.image.large} alt={coin.name} width={50} height={50} />
        <h1>
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>
      </div>
      <div className="tagsContainer">
        {coin.categories
          .filter((c) => c)
          .map((cat) => (
            <span key={cat} className="tag">
              {cat}
            </span>
          ))}
      </div>
      <div style={{maxWidth: "800px", margin: "2rem 0"}}>
        {chartData && <CryptoChart chartData={chartData} />}
      </div>
      <h2 className="sectionTitle">Market Statistics</h2>
      <MarketStats coin={coin} />
      <h2 className="sectionTitle">Description</h2>
      {coin.description?.en ? (
        <div dangerouslySetInnerHTML={{__html: coin.description.en}} />
      ) : (
        <p>No description available</p>
      )}
      <h2 className="sectionTitle">Links</h2>
      <div className="linksContainer">
        {coin.links.homepage?.[0] && (
          <a
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        )}
        {coin.links.blockchain_site?.[0] && (
          <a
            href={coin.links.blockchain_site[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorer
          </a>
        )}
        {coin.links.subreddit_url && (
          <a
            href={coin.links.subreddit_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reddit
          </a>
        )}
      </div>
    </main>
  );
}
