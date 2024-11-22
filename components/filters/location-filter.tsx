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
import { LocationModel } from "@/interfaces";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

export default function LocationFilter({
  locations,
}: {
  locations: LocationModel[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationModel | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedLocation) {
      params.set("location", String(selectedLocation.id));
    } else {
      params.delete("location");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedLocation]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[150px] justify-start border-dashed"
        >
          {selectedLocation ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                <span>Location</span>
              </div>
              <Separator className="h-5" orientation="vertical" />
              <Badge className="rounded-sm" variant="secondary">
                {selectedLocation.name}
              </Badge>
            </div>
          ) : (
            <div className="flex items-center">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>Location</span>
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
              {locations.map((location) => (
                <CommandItem
                  key={location.id}
                  value={String(location.name)}
                  onSelect={(value) => {
                    setSelectedLocation(
                      locations.find(
                        (priority) => String(priority.name) === value
                      ) || null
                    );

                    console.log(value);
                    setOpen(false);
                  }}
                >
                  <span>{location.name}</span>
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
              setSelectedLocation(null);
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
