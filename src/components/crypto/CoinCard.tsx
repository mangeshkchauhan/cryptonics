import Link from "next/link";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import type { Coin } from "@/types/crypto";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface CoinCardProps {
  coin: Coin;
}

export function CoinCard({ coin }: CoinCardProps) {
  const { currencySymbol } = useCurrency();
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <Link href={`/coins/${coin.id}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src={coin.image}
                alt={coin.name}
                fill
                className="rounded-full"
                sizes="40px"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                {coin.symbol.toUpperCase()}
              </h3>
              <p className="text-gray-400 text-xs truncate max-w-[100px]">
                {coin.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">#{coin.market_cap_rank}</div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-xl font-bold text-white mb-1">
            {currencySymbol}{coin.current_price.toLocaleString()}
          </div>
          <div className={`flex items-center space-x-1 text-sm ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{formatPercentage(Math.abs(coin.price_change_percentage_24h))}</span>
          </div>
        </div>

        {/* Market Data */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Market Cap</span>
            <span className="text-white font-medium">
              {formatCurrency(coin.market_cap, "USD")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Volume (24h)</span>
            <span className="text-white font-medium">
              {formatCurrency(coin.total_volume, "USD")}
            </span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs text-blue-400 text-center">
            Click for details →
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 