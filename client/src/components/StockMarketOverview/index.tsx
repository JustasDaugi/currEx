"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StockMarketOverview() {
  const [period, setPeriod] = useState("7d");
  const [selectedMarket, setSelectedMarket] = useState("nasdaq");

  const stockData = {
    nasdaq: {
      name: "NASDAQ",
      color: "#2563eb",
      "7d": generateStockData(16200, 16400, 7),
      "1m": generateStockData(16000, 16500, 30),
      "3m": generateStockData(15800, 16600, 90),
      "6m": generateStockData(15500, 16700, 180),
    },
    nyse: {
      name: "NYSE",
      color: "#16a34a",
      "7d": generateStockData(33500, 33800, 7),
      "1m": generateStockData(33200, 33900, 30),
      "3m": generateStockData(32800, 34000, 90),
      "6m": generateStockData(32500, 34200, 180),
    },
    sp500: {
      name: "S&P 500",
      color: "#9333ea",
      "7d": generateStockData(5100, 5200, 7),
      "1m": generateStockData(5000, 5250, 30),
      "3m": generateStockData(4900, 5300, 90),
      "6m": generateStockData(4800, 5350, 180),
    },
    ftse: {
      name: "FTSE 100",
      color: "#ea580c",
      "7d": generateStockData(7900, 8000, 7),
      "1m": generateStockData(7800, 8050, 30),
      "3m": generateStockData(7700, 8100, 90),
      "6m": generateStockData(7600, 8150, 180),
    },
    nikkei: {
      name: "Nikkei 225",
      color: "#dc2626",
      "7d": generateStockData(38000, 38300, 7),
      "1m": generateStockData(37800, 38400, 30),
      "3m": generateStockData(37500, 38500, 90),
      "6m": generateStockData(37000, 38600, 180),
    },
    dax: {
      name: "DAX",
      color: "#7c3aed",
      "7d": generateStockData(18300, 18500, 7),
      "1m": generateStockData(18100, 18600, 30),
      "3m": generateStockData(17900, 18700, 90),
      "6m": generateStockData(17700, 18800, 180),
    },
  };

  const currentMarketData = stockData[selectedMarket];
  const chartData = currentMarketData[period];

  const currentValue = chartData[chartData.length - 1].value;
  const previousValue = chartData[0].value;
  const change = currentValue - previousValue;
  const percentChange = (change / previousValue) * 100;
  const isPositive = change >= 0;

  const values = chartData.map((item) => item.value);
  const minValue = Math.min(...values) * 0.99;
  const maxValue = Math.max(...values) * 1.01;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Stock Market Overview</CardTitle>
          <CardDescription>Historical stock market performance</CardDescription>
        </div>
        <Select value={selectedMarket} onValueChange={setSelectedMarket}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nasdaq">NASDAQ</SelectItem>
            <SelectItem value="nyse">NYSE</SelectItem>
            <SelectItem value="sp500">S&P 500</SelectItem>
            <SelectItem value="ftse">FTSE 100</SelectItem>
            <SelectItem value="nikkei">Nikkei 225</SelectItem>
            <SelectItem value="dax">DAX</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold">
              {currentValue.toLocaleString()}
            </div>
            <div
              className={`text-sm flex items-center ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(change).toLocaleString()} (
              {Math.abs(percentChange).toFixed(2)}%)
            </div>
          </div>
          <Tabs
            defaultValue="7d"
            value={period}
            onValueChange={setPeriod}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="6m">6M</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="h-[300px] w-full">
          <StockChart
            data={chartData}
            color={currentMarketData.color}
            minValue={minValue}
            maxValue={maxValue}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StockChart({ data, color, minValue, maxValue }) {
  const chartHeight = 300;
  const chartWidth = 100;

  const valueRange = maxValue - minValue;

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
        <div>{Math.round(maxValue).toLocaleString()}</div>
        <div>{Math.round((maxValue + minValue) / 2).toLocaleString()}</div>
        <div>{Math.round(minValue).toLocaleString()}</div>
      </div>

      <div className="absolute left-10 right-0 top-0 bottom-0">
        <div className="absolute inset-0 border-b border-gray-200"></div>
        <div className="absolute inset-0 h-1/2 border-b border-gray-200"></div>

        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={`gradient-${color.substring(1)}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={generateAreaPath(data, valueRange, minValue, chartHeight)}
            fill={`url(#gradient-${color.substring(1)})`}
          />
          <path
            d={generateLinePath(data, valueRange, minValue, chartHeight)}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />

          {data.map((point, index) => {
            if (
              data.length > 30 &&
              index % Math.ceil(data.length / 15) !== 0 &&
              index !== data.length - 1
            ) {
              return null;
            }

            const x = `${(index / (data.length - 1)) * 100}%`;
            const y =
              chartHeight -
              ((point.value - minValue) / valueRange) * chartHeight;

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="white"
                stroke={color}
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
          {data.map((point, index) => {
            if (
              data.length > 30 &&
              index % Math.ceil(data.length / 6) !== 0 &&
              index !== data.length - 1
            ) {
              return null;
            }

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${(index / (data.length - 1)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {point.date}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function generateLinePath(data, valueRange, minValue, height) {
  return data
    .map((point, index) => {
      const x = `${(index / (data.length - 1)) * 100}%`;
      const y = height - ((point.value - minValue) / valueRange) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function generateAreaPath(data, valueRange, minValue, height) {
  const linePath = data
    .map((point, index) => {
      const x = `${(index / (data.length - 1)) * 100}%`;
      const y = height - ((point.value - minValue) / valueRange) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const firstX = `${0}%`;
  const lastX = `${100}%`;

  return `${linePath} L ${lastX} ${height} L ${firstX} ${height} Z`;
}

function generateStockData(baseValue, maxValue, days) {
  const data = [];
  let currentValue = baseValue;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const change = (Math.random() - 0.48) * (maxValue - baseValue) * 0.05;
    currentValue = Math.max(
      baseValue * 0.9,
      Math.min(maxValue * 1.1, currentValue + change)
    );

    data.push({
      date: formatDate(date, days),
      value: currentValue,
    });
  }

  return data;
}

function formatDate(date, days) {
  if (days <= 7) {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  } else if (days <= 31) {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  } else {
    return `${date.getMonth() + 1}/${date.getFullYear().toString().substr(2)}`;
  }
}
