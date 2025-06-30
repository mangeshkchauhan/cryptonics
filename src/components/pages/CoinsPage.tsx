"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useCoins } from "@/hooks/useCrypto";
import { useCurrency } from "@/contexts/CurrencyContext";
import { LoadingSpinner, PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { CoinCard } from "@/components/crypto/CoinCard";
import { Pagination } from "@/components/ui/Pagination";
import { Search, TrendingUp } from "lucide-react";

export function CoinsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { currency } = useCurrency();

  const {
    data: coins,
    isLoading,
    error,
    refetch,
  } = useCoins(currentPage, currency);

  const filteredCoins = coins?.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading && currentPage === 1) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage
          title="Failed to Load Cryptocurrencies"
          message="There was an error fetching cryptocurrency data. Please check your connection and try again."
          onRetry={() => refetch()}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Cryptocurrencies
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Discover and track thousands of cryptocurrencies with real-time data
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Coins Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>

            {filteredCoins.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No cryptocurrencies found matching &quot;{searchTerm}&quot;
                </p>
              </div>
            )}

            {/* Pagination */}
            {!searchTerm && (
              <Pagination
                currentPage={currentPage}
                totalPages={132} // CoinGecko has about 132 pages of 100 coins each
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
} 