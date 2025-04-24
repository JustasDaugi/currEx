"use client";

import { useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCurrencies } from "@/hooks/use-currencies";
import { useCurrencyConverter } from "@/hooks/use-currency-converter";

export function CurrencyConverter() {
  const { currencies } = useCurrencies();
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    isConverting,
    error,
    handleConvert,
    handleSwap,
  } = useCurrencyConverter();

  useEffect(() => {
    if (currencies.length) {
      setFromCurrency(currencies[0].code);
      setToCurrency(currencies[1]?.code ?? currencies[0].code);
    }
  }, [currencies, setFromCurrency, setToCurrency]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>
          Convert between currencies with real-time exchange rates
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            disabled={isConverting}
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <Select
              value={fromCurrency}
              onValueChange={setFromCurrency}
              disabled={isConverting}
            >
              <SelectTrigger id="from-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} – {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwap}
            disabled={isConverting}
            className="mt-8"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <Select
              value={toCurrency}
              onValueChange={setToCurrency}
              disabled={isConverting}
            >
              <SelectTrigger id="to-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} – {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        {error && <div className="text-sm text-red-500">{error.message}</div>}
        <Button
          onClick={handleConvert}
          className="w-full"
          disabled={isConverting}
        >
          {isConverting ? "Converting…" : "Convert"}
        </Button>

        <div className="w-full p-4 bg-gray-100 rounded-md">
          <div className="text-sm text-gray-500">Converted Amount</div>
          <div className="text-2xl font-bold">
            {result.toFixed(2)} {toCurrency}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            1 {fromCurrency} = {(result / (amount || 1)).toFixed(4)}{" "}
            {toCurrency}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
