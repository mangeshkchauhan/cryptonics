"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import type { ChartData, TimeRange } from "@/types/crypto";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  data: ChartData;
  currency: string;
  timeRange: TimeRange;
}

export function PriceChart({ data, currency, timeRange }: PriceChartProps) {
  if (!data.prices || data.prices.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-gray-400">No chart data available</p>
      </div>
    );
  }

  // Process data for Chart.js
  const prices: number[] = [];
  const labels: string[] = [];

  data.prices.forEach(([timestamp, price]) => {
    prices.push(price);
    
    const date = new Date(timestamp);
    let label: string;
    
    if (timeRange === "24h") {
      label = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === "7d" || timeRange === "14d") {
      label = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      label = date.toLocaleDateString([], { month: 'short', year: '2-digit' });
    }
    
    labels.push(label);
  });

  // Determine color based on price trend
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const isPositive = lastPrice >= firstPrice;
  
  const chartData = {
    labels,
    datasets: [
      {
        label: `Price (${currency})`,
        data: prices,
        borderColor: isPositive ? '#10B981' : '#EF4444', // green or red
        backgroundColor: isPositive 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: isPositive ? '#10B981' : '#EF4444',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${currency}${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
          maxTicksLimit: 8,
        },
      },
      y: {
        display: true,
        position: 'right' as const,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value: any) {
            return `${currency}${value.toLocaleString()}`;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
} 