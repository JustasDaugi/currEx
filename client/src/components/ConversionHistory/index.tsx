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

export function ConversionHistory() {
  const conversions = [
    {
      id: 1,
      date: "Apr 11, 2025",
      fromCurrency: "USD",
      toCurrency: "EUR",
      amount: 1000,
      rate: 0.92,
      result: 920,
    },
    {
      id: 2,
      date: "Apr 10, 2025",
      fromCurrency: "EUR",
      toCurrency: "GBP",
      amount: 500,
      rate: 0.85,
      result: 425,
    },
    {
      id: 3,
      date: "Apr 9, 2025",
      fromCurrency: "GBP",
      toCurrency: "USD",
      amount: 750,
      rate: 1.28,
      result: 960,
    },
    {
      id: 4,
      date: "Apr 8, 2025",
      fromCurrency: "USD",
      toCurrency: "JPY",
      amount: 200,
      rate: 153.45,
      result: 30690,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion History</CardTitle>
        <CardDescription>Your recent currency conversions</CardDescription>
      </CardHeader>
      <CardContent>
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
            {conversions.map((conversion) => (
              <TableRow key={conversion.id}>
                <TableCell>{conversion.date}</TableCell>
                <TableCell>{conversion.fromCurrency}</TableCell>
                <TableCell>{conversion.toCurrency}</TableCell>
                <TableCell className="text-right">
                  {conversion.amount.toLocaleString()} {conversion.fromCurrency}
                </TableCell>
                <TableCell className="text-right">{conversion.rate}</TableCell>
                <TableCell className="text-right">
                  {conversion.result.toLocaleString()} {conversion.toCurrency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
