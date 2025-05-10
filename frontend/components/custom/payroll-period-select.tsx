"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { PayrollReportPeriod } from "@/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PayrollPeriodSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (value: PayrollReportPeriod) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("period", value);
    } else {
      params.delete("period");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      defaultValue={searchParams.get("period")?.toString() || "this_month"}
      onValueChange={(value) => handleSelect(value as PayrollReportPeriod)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fixed Periods</SelectLabel>
          <SelectItem value="this_month">This Month</SelectItem>
          <SelectItem value="last_month">Last Month</SelectItem>
          <SelectItem value="this_year">This Year</SelectItem>
          <SelectItem value="last_year">Last Year</SelectItem>
          <SelectItem value="this_quarter">This Quarter</SelectItem>
          <SelectItem value="last_quarter">Last Quarter</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Custom Periods</SelectLabel>
          <SelectItem value="last_30_days">Last 30 Days</SelectItem>
          <SelectItem value="last_90_days">Last 90 Days</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
