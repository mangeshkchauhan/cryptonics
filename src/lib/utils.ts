import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  }
  return num.toString();
}

export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(2)}%`;
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    inr: "₹",
    usd: "$",
    eur: "€",
  };
  return symbols[currency.toLowerCase()] || "$";
} 