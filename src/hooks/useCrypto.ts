import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { cryptoService } from "@/services/cryptoService";
import type { Coin, CoinDetails, Exchange, ChartData, Currency, TimeRange, TrendingCoin, GlobalMarketData } from "@/types/crypto";

// Query keys for consistent cache management
export const QUERY_KEYS = {
  coins: (page: number, currency: Currency) => ["coins", page, currency] as const,
  coinDetails: (coinId: string) => ["coin-details", coinId] as const,
  coinChart: (coinId: string, currency: Currency, days: TimeRange) => 
    ["coin-chart", coinId, currency, days] as const,
  exchanges: () => ["exchanges"] as const,
  trending: () => ["trending"] as const,
  global: () => ["global"] as const,
};

// Hook for fetching paginated coins
export function useCoins(
  page: number = 1, 
  currency: Currency = "usd",
  options?: Omit<UseQueryOptions<Coin[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: QUERY_KEYS.coins(page, currency),
    queryFn: () => cryptoService.getCoins(page, currency),
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    ...options,
  });
}

// Hook for fetching coin details
export function useCoinDetails(
  coinId: string,
  options?: Omit<UseQueryOptions<CoinDetails>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: QUERY_KEYS.coinDetails(coinId),
    queryFn: () => cryptoService.getCoinDetails(coinId),
    enabled: !!coinId,
    staleTime: 60 * 1000, // Consider data fresh for 1 minute
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    ...options,
  });
}

// Hook for fetching coin chart data
export function useCoinChart(
  coinId: string,
  currency: Currency = "usd",
  days: TimeRange = "7d",
  options?: Omit<UseQueryOptions<ChartData>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: QUERY_KEYS.coinChart(coinId, currency, days),
    queryFn: () => cryptoService.getCoinChart(coinId, currency, days),
    enabled: !!coinId,
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    ...options,
  });
}

// Hook for fetching exchanges
export function useExchanges(
  options?: Omit<UseQueryOptions<Exchange[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: QUERY_KEYS.exchanges(),
    queryFn: cryptoService.getExchanges,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    ...options,
  });
}

// Hook for fetching trending coins
export function useTrendingCoins(
  options?: Omit<UseQueryOptions<{ coins: TrendingCoin[] }>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: QUERY_KEYS.trending(),
    queryFn: cryptoService.getTrendingCoins,
    staleTime: 60 * 1000, // Consider data fresh for 1 minute
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    ...options,
  });
}

// Hook for fetching global market data
export function useGlobalData(
  options?: Omit<UseQueryOptions<GlobalMarketData>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: QUERY_KEYS.global(),
    queryFn: cryptoService.getGlobalData,
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    ...options,
  });
} 