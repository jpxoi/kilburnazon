import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function getFormattedValue(
  value: number,
  type: "number" | "currency" | "percentage" | null
) {
  switch (type) {
    case "number":
      return new Intl.NumberFormat("en-GB").format(value);
    case "currency":
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(value);
    case "percentage":
      return new Intl.NumberFormat("en-GB", {
        style: "percent",
        minimumFractionDigits: 2,
      }).format(value);
    default:
      return value;
  }
}

export default function SummaryCard({
  description,
  value,
  type,
}: {
  description: string;
  value: number;
  type: "number" | "currency" | "percentage" | null;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle>{getFormattedValue(value, type)}</CardTitle>
      </CardHeader>
    </Card>
  );
}
