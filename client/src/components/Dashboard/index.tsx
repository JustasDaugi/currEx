"use client";

import { CurrencyConverter } from "@/components/CurrencyConverter";
import { HistoricalChart } from "@/components/HistoricalChart";
import { ConversionHistory } from "@/components/ConversionHistory";
import { StockMarketOverview } from "@/components/StockMarketOverview";
import "@/app/globals.css";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Currency Exchange Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CurrencyConverter />
          <HistoricalChart />
        </div>
        <ConversionHistory />
        <StockMarketOverview />
      </main>
    </div>
  );
}
