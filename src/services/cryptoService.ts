import { api } from "@/lib/api";
import type { Coin, CoinDetails, Exchange, ChartData, Currency, TimeRange } from "@/types/crypto";

export const cryptoService = {
  // Fetch paginated list of coins
  async getCoins(page: number = 1, currency: Currency = "usd", perPage: number = 100): Promise<Coin[]> {
    const response = await api.get<Coin[]>("/coins/markets", {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: perPage,
        page,
        sparkline: false,
      },
    });
    return response.data;
  },

  // Fetch detailed information about a specific coin
  async getCoinDetails(coinId: string): Promise<CoinDetails> {
    const response = await api.get<CoinDetails>(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: true,
        developer_data: true,
        sparkline: false,
      },
    });
    return response.data;
  },

  // Fetch chart data for a specific coin
  async getCoinChart(
    coinId: string,
    currency: Currency = "usd",
    days: TimeRange = "7d"
  ): Promise<ChartData> {
    const daysParam = days === "max" ? "max" : days.replace(/[hdmy]/, "");
    const response = await api.get<ChartData>(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: currency,
        days: daysParam,
      },
    });
    return response.data;
  },

  // Fetch list of exchanges
  async getExchanges(): Promise<Exchange[]> {
    const response = await api.get<Exchange[]>("/exchanges", {
      params: {
        per_page: 100,
        page: 1,
      },
    });
    return response.data;
  },

  // Search for coins
  async searchCoins(query: string): Promise<{ coins: Coin[] }> {
    const response = await api.get(`/search`, {
      params: {
        query,
      },
    });
    return response.data;
  },

  // Fetch trending coins
  async getTrendingCoins(): Promise<{ coins: any[] }> {
    const response = await api.get("/search/trending");
    return response.data;
  },

  // Fetch global market data
  async getGlobalData(): Promise<any> {
    const response = await api.get("/global");
    return response.data;
  },
}; 