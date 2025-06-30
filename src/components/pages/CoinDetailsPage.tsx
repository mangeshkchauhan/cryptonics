"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { useCoinDetails, useCoinChart } from "@/hooks/useCrypto";
import { useCurrency } from "@/contexts/CurrencyContext";
import { LoadingSpinner, PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { PriceChart } from "@/components/crypto/PriceChart";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import type { TimeRange } from "@/types/crypto";

interface CoinDetailsPageProps {
  coinId: string;
}

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: "24H", value: "24h" },
  { label: "7D", value: "7d" },
  { label: "14D", value: "14d" },
  { label: "30D", value: "30d" },
  { label: "60D", value: "60d" },
  { label: "200D", value: "200d" },
  { label: "1Y", value: "1y" },
  { label: "Max", value: "max" },
];

export function CoinDetailsPage({ coinId }: CoinDetailsPageProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("7d");
  const { currency, currencySymbol } = useCurrency();

  const {
    data: coinDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails,
  } = useCoinDetails(coinId);

  const {
    data: chartData,
    isLoading: isLoadingChart,
    error: chartError,
    refetch: refetchChart,
  } = useCoinChart(coinId, currency, selectedTimeRange);

  if (isLoadingDetails) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  if (detailsError) {
    return (
      <Layout>
        <ErrorMessage
          title="Failed to Load Coin Details"
          message="There was an error fetching coin data. Please check your connection and try again."
          onRetry={() => refetchDetails()}
        />
      </Layout>
    );
  }

  if (!coinDetails) {
    return (
      <Layout>
        <ErrorMessage
          title="Coin Not Found"
          message="The requested cryptocurrency could not be found."
          showRetry={false}
        />
      </Layout>
    );
  }

  const currentPrice = coinDetails.market_data.current_price[currency];
  const priceChange24h = coinDetails.market_data.price_change_percentage_24h;
  const isPositive = priceChange24h >= 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/coins" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Coins</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <Image
              src={coinDetails.image.large}
              alt={coinDetails.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {coinDetails.name}
              </h1>
              <p className="text-gray-400 text-lg">
                {coinDetails.symbol.toUpperCase()} #{coinDetails.market_cap_rank}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {currencySymbol}{currentPrice.toLocaleString()}
            </div>
            <div className={`flex items-center justify-end space-x-1 text-lg ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span>{formatPercentage(Math.abs(priceChange24h))}</span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">
              Price Chart
            </h2>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={selectedTimeRange === range.value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range.value)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {isLoadingChart ? (
            <div className="h-[400px] flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : chartError ? (
            <div className="h-[400px] flex items-center justify-center">
              <ErrorMessage
                title="Chart Error"
                message="Failed to load chart data"
                onRetry={() => refetchChart()}
              />
            </div>
          ) : chartData ? (
            <PriceChart
              data={chartData}
              currency={currencySymbol}
              timeRange={selectedTimeRange}
            />
          ) : null}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Data */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Market Statistics</h3>
            <div className="space-y-4">
              <StatItem
                label="Market Cap"
                value={formatCurrency(coinDetails.market_data.market_cap[currency], currency.toUpperCase())}
              />
              <StatItem
                label="24h Trading Volume"
                value={formatCurrency(coinDetails.market_data.total_volume[currency], currency.toUpperCase())}
              />
              <StatItem
                label="Circulating Supply"
                value={`${formatNumber(coinDetails.market_data.circulating_supply)} ${coinDetails.symbol.toUpperCase()}`}
              />
              {coinDetails.market_data.max_supply && (
                <StatItem
                  label="Max Supply"
                  value={`${formatNumber(coinDetails.market_data.max_supply)} ${coinDetails.symbol.toUpperCase()}`}
                />
              )}
              <StatItem
                label="All Time High"
                value={formatCurrency(coinDetails.market_data.ath[currency], currency.toUpperCase())}
              />
              <StatItem
                label="All Time Low"
                value={formatCurrency(coinDetails.market_data.atl[currency], currency.toUpperCase())}
              />
            </div>
          </div>

          {/* Links and Info */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Links & Information</h3>
            <div className="space-y-4">
              {coinDetails.links.homepage[0] && (
                <LinkItem
                  label="Website"
                  href={coinDetails.links.homepage[0]}
                />
              )}
              {coinDetails.links.repos_url.github[0] && (
                <LinkItem
                  label="GitHub"
                  href={coinDetails.links.repos_url.github[0]}
                />
              )}
              {coinDetails.genesis_date && (
                <StatItem
                  label="Genesis Date"
                  value={new Date(coinDetails.genesis_date).toLocaleDateString()}
                />
              )}
              <StatItem
                label="CoinGecko Rank"
                value={`#${coinDetails.coingecko_rank}`}
              />
              {coinDetails.market_data.last_updated && (
                <StatItem
                  label="Last Updated"
                  value={new Date(coinDetails.market_data.last_updated).toLocaleString()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

function LinkItem({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <span className="text-sm">Visit</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
} 