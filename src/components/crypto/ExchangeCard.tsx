import Image from "next/image";
import { ExternalLink, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { Exchange } from "@/types/crypto";
import { formatNumber } from "@/lib/utils";

interface ExchangeCardProps {
  exchange: Exchange;
}

export function ExchangeCard({ exchange }: ExchangeCardProps) {
  const trustScoreColor = exchange.trust_score >= 8 
    ? "text-green-400" 
    : exchange.trust_score >= 6 
    ? "text-yellow-400" 
    : "text-red-400";

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <a
        href={exchange.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src={exchange.image}
                alt={exchange.name}
                fill
                className="rounded-full"
                sizes="40px"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                {exchange.name}
              </h3>
              <p className="text-gray-400 text-xs">
                Rank #{exchange.trust_score_rank}
              </p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        {/* Trust Score */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Trust Score</span>
          </div>
          <div className={`text-2xl font-bold ${trustScoreColor}`}>
            {exchange.trust_score}/10
          </div>
        </div>

        {/* Trading Volume */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">24h Volume (BTC)</span>
          </div>
          <div className="text-white font-semibold">
            ₿{formatNumber(exchange.trade_volume_24h_btc)}
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-xs">
          {exchange.year_established && (
            <div className="flex justify-between">
              <span className="text-gray-400">Established</span>
              <span className="text-white font-medium">
                {exchange.year_established}
              </span>
            </div>
          )}
          {exchange.country && (
            <div className="flex justify-between">
              <span className="text-gray-400">Country</span>
              <span className="text-white font-medium">
                {exchange.country}
              </span>
            </div>
          )}
        </div>

        {/* Hover indicator */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs text-blue-400 text-center">
            Visit exchange →
          </div>
        </div>
      </a>
    </motion.div>
  );
} 