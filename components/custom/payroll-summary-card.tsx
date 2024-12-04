import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PayrollSummaryCard({
  description,
  value,
}: {
  description: string;
  value: number;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(value)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
