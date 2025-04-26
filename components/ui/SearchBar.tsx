"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation'

interface Location {
  company: string;
}

interface SearchBarProps {
  initialUniversity?: string;
}

export const SearchBar = ({ initialUniversity = "" }: SearchBarProps) => {
  const router = useRouter()

  const [selectedUniversity, setSelectedUniversity] = useState(initialUniversity);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLocations([]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
     router.push(`/search?university=${encodeURIComponent(selectedUniversity)}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>Loading universities...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-4">
      <Select
        value={selectedUniversity}
        onValueChange={setSelectedUniversity}
      >
        <SelectTrigger className="h-12 bg-white/90 backdrop-blur-sm border-transparent focus-visible:ring-blue-900 w-full md:w-[250px]">
          <SelectValue placeholder="Select University" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>All</SelectLabel>
            <SelectItem value="All Universities">All Universities</SelectItem>
          </SelectGroup>
          <SelectGroup key="universities">
            <SelectLabel>Universities</SelectLabel>
            {locations.map((location) => (
              <SelectItem key={location.company} value={location.company}>
                {location.company}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
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
