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
import { JobRoleModel } from "@/interfaces";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

export default function JobRoleFilter({
  jobRoles,
}: {
  jobRoles: JobRoleModel[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState<JobRoleModel | null>(
    null
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedJobRole) {
      params.set("jobRole", String(selectedJobRole.id));
    } else {
      params.delete("jobRole");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams, selectedJobRole]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[150px] justify-start border-dashed"
        >
          {selectedJobRole ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                <span>Job Role</span>
              </div>
              <Separator className="h-5" orientation="vertical" />
              <Badge className="rounded-sm" variant="secondary">
                {selectedJobRole.title}
              </Badge>
            </div>
          ) : (
            <div className="flex items-center">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>Job Role</span>
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
              {jobRoles.map((jobRole) => (
                <CommandItem
                  key={jobRole.id}
                  value={String(jobRole.title)}
                  onSelect={(value) => {
                    setSelectedJobRole(
                      jobRoles.find(
                        (priority) => String(priority.title) === value
                      ) || null
                    );
                    setOpen(false);
                  }}
                >
                  <span>{jobRole.title}</span>
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
              setSelectedJobRole(null);
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
