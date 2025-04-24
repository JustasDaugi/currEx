"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/stores/auth";

export interface Conversion {
  id: string;
  date: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  result: number;
}

export function ConversionHistory() {
  const user = useAuthStore((s) => s.user);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_CONVERSIONS_PATH}/${user.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch conversion history");
        const data: Conversion[] = await res.json();
        setConversions(
          data.map((c) => ({
            ...c,
            date: new Date(c.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const fmt = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion History</CardTitle>
        <CardDescription>Your recent currency conversions</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.date}</TableCell>
                  <TableCell>{c.fromCurrency}</TableCell>
                  <TableCell>{c.toCurrency}</TableCell>
                  <TableCell className="text-right">
                    {fmt(c.amount)} {c.fromCurrency}
                  </TableCell>
                  <TableCell className="text-right">
                    {c.rate.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {fmt(c.result)} {c.toCurrency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
