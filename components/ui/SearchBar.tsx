"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Location {
  id: string;
  name: string;
  location: string;
  created_at: string;
  company: string;
  state: string;
}

interface SearchBarProps {
  initialUniversity?: string;
}

export const SearchBar = ({ initialUniversity = "" }: SearchBarProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState(initialUniversity);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("/api/get-all-locations");
        const { data } = await res.json();
        setLocations(data || []);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocations();
  }, []);

  const handleSearch = () => {
    router.push(`/search?company=${encodeURIComponent(selectedCompany)}`);
  };

  const uniqueCompanies = Array.from(
    new Map(
      locations.map((location) => [location.company.trim(), location]) // Map company name to location
    ).values()
  );

  const groupedByState = uniqueCompanies.reduce(
    (acc: Record<string, Location[]>, location) => {
      const state = location.state || "Other";
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(location);
      return acc;
    },
    {}
  );

  const filteredGroupedByState = Object.keys(groupedByState).reduce(
    (acc: Record<string, Location[]>, state) => {
      const filteredLocations = groupedByState[state].filter((location) =>
        location.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredLocations.length > 0) {
        acc[state] = filteredLocations;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-4 items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-64 md:w-96 md:justify-between"
          >
            {selectedCompany
              ? selectedCompany
              : "Select University or Company"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput
              placeholder="Search"
              value={searchQuery}
              onValueChange={(value) => setSearchQuery(value)}
            />
            <CommandList>
              <CommandEmpty>No university/company found.</CommandEmpty>

              {/* Grouped by state */}
              {Object.keys(filteredGroupedByState).map((state) => (
                <CommandGroup key={state} heading={state}>
                  {/* Add "All" option first */}
                  <CommandItem
                    key={`${state}-all`}
                    value={`All in ${state}`}
                    onSelect={() => {
                      setSelectedCompany(`All in ${state}`);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCompany === `All in ${state}`
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {`All in ${state}`}
                  </CommandItem>

                  {/* Then render each individual dorm/company */}
                  {filteredGroupedByState[state].map((location) => (
                    <CommandItem
                      key={location.id}
                      value={location.company.trim()}
                      onSelect={(currentValue) => {
                        setSelectedCompany(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCompany === location.company.trim()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {location.company.trim()}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        className="h-full bg-blue-900 hover:bg-blue-800"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
