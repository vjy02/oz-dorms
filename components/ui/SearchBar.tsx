"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const [selectedUniversity, setSelectedUniversity] = useState(initialUniversity);
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
    router.push(`/search?company=${encodeURIComponent(selectedUniversity)}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const uniqueCompanies = Array.from(
    new Map(
      locations.map((location) => [location.company.trim(), location]) // Map company name to location
    ).values()
  );

  const groupedByState = uniqueCompanies.reduce((acc: Record<string, Location[]>, location) => {
    const state = location.state || "Other";
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(location);
    return acc;
  }, {});

  const filteredGroupedByState = Object.keys(groupedByState).reduce((acc: Record<string, Location[]>, state) => {
    const filteredLocations = groupedByState[state].filter((location) =>
      location.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredLocations.length > 0) {
      acc[state] = filteredLocations;
    }
    return acc;
  }, {});

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full md:w-[250px] justify-between"
          >
            {selectedUniversity ? selectedUniversity : "Select University or Company"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[250px] p-0">
          <Command>
            <CommandInput
              placeholder="Search"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No university/company found.</CommandEmpty>

              {/* Grouped by state */}
              {Object.keys(filteredGroupedByState).map((state) => (
                <CommandGroup key={state} heading={state}>
                  {filteredGroupedByState[state].map((location) => (
                    <CommandItem
                      key={location.id}
                      value={location.company.trim()}
                      onSelect={(currentValue) => {
                        setSelectedUniversity(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedUniversity === location.company.trim() ? "opacity-100" : "opacity-0"
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
