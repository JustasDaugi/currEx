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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { DEFAULT_CURRENCY_PAIRS, TIME_PERIODS } from "@/constants";
import { useHistoricalRates } from "@/hooks/use-historical-rates";
import { CustomTooltip } from "./ChartTooltip";

export function HistoricalChart() {
  const [period, setPeriod] = useState("7d");
  const [currencyPair, setCurrencyPair] = useState("USD/EUR");

  const [baseCurrency, targetCurrency] = currencyPair.split("/");
  const { historicalData, isLoading, error } = useHistoricalRates(
    baseCurrency,
    targetCurrency,
    period
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Exchange Rate History</CardTitle>
          <CardDescription>Historical exchange rate data</CardDescription>
        </div>
        <Select value={currencyPair} onValueChange={setCurrencyPair}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Currency Pair" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_CURRENCY_PAIRS.map((pair) => (
              <SelectItem key={pair} value={pair}>
                {pair}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="7d" value={period} onValueChange={setPeriod}>
          <TabsList className="mb-4">
            {Object.entries(TIME_PERIODS).map(([key, { label }]) => (
              <TabsTrigger key={key} value={key}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading...
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-yellow-500">
                {error}
              </div>
            ) : historicalData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historicalData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="formattedDate"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.toFixed(4)}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {historicalData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isIncrease ? "#22c55e" : "#ef4444"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
