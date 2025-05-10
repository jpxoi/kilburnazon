"use client";

import { useEffect, useState } from "react";

import { PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DepartmentModel } from "@/interfaces";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

export default function DepartmentFilter({
  departments,
}: {
  departments: DepartmentModel[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedDepartment) {
      params.set("department", String(selectedDepartment.id));
    } else {
      params.delete("department");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedDepartment, searchParams, pathname, replace]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[150px] justify-start border-dashed"
        >
          {selectedDepartment ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                <span>Department</span>
              </div>
              <Separator className="h-5" orientation="vertical" />
              <Badge className="rounded-sm" variant="secondary">
                {selectedDepartment.name}
              </Badge>
            </div>
          ) : (
            <div className="flex items-center">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>Department</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {departments.map((department) => (
                <CommandItem
                  key={department.id}
                  value={String(department.name)}
                  onSelect={(value) => {
                    setSelectedDepartment(
                      departments.find(
                        (priority) => String(priority.name) === value
                      ) || null
                    );
                    setOpen(false);
                  }}
                >
                  <span>{department.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => {
              setSelectedDepartment(null);
              setOpen(false);
            }}
          >
            Clear filter
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
