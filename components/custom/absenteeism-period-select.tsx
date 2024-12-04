"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AbsenteeismPeriodSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (value: "monthly" | "quarterly" | "yearly") => {
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
      defaultValue={searchParams.get("period")?.toString() || "monthly"}
      onValueChange={(value) => handleSelect(value as "monthly" | "quarterly" | "yearly")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="monthly">Monthly</SelectItem>
        <SelectItem value="quarterly">Quarterly</SelectItem>
        <SelectItem value="yearly">Yearly</SelectItem>
      </SelectContent>
    </Select>
  );
}
