"use client";

import { Layout } from "@/components/layout/Layout";
import { useExchanges } from "@/hooks/useCrypto";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ExchangeCard } from "@/components/crypto/ExchangeCard";
import { Building2 } from "lucide-react";

export function ExchangesPage() {
  const {
    data: exchanges,
    isLoading,
    error,
    refetch,
  } = useExchanges();

  if (isLoading) {
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
          title="Failed to Load Exchanges"
          message="There was an error fetching exchange data. Please check your connection and try again."
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
            <Building2 className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Cryptocurrency Exchanges
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Discover trusted cryptocurrency exchanges with their trust scores and trading volumes
          </p>
        </div>

        {/* Exchanges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exchanges?.map((exchange) => (
            <ExchangeCard key={exchange.id} exchange={exchange} />
          ))}
        </div>

        {exchanges?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No exchanges available at the moment.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
} 