"use client"

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DormCard from "@/components/ui/DormCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Page() {
  const universityQuery = "All Universities";
  const [sortBy, setSortBy] = useState("rating");

  // Mock data for search results
  const mockDorms = [
    {
      id: 1,
      name: "University Hall",
      university: "University of Melbourne",
      imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
      rating: 4.5,
      reviewCount: 128,
      price: "A$350/week",
      features: ["WiFi", "Gym", "Dining Hall"],
    },
    {
      id: 2,
      name: "Ormond College",
      university: "University of Melbourne",
      imageUrl: "https://images.unsplash.com/photo-1573919664876-e4306bb46559?auto=format&fit=crop&q=80&w=800",
      rating: 4.2,
      reviewCount: 95,
      price: "A$380/week",
      features: ["Pool", "Study Spaces", "WiFi"],
    },
    {
      id: 3,
      name: "Village Green",
      university: "Monash University",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      rating: 3.9,
      reviewCount: 87,
      price: "A$310/week",
      features: ["Parking", "WiFi", "Security"],
    },
    {
      id: 4,
      name: "Urbanest South Bank",
      university: "University of Queensland",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
      rating: 4.7,
      reviewCount: 156,
      price: "A$395/week",
      features: ["Private Bath", "WiFi", "Gym"],
    },
    {
      id: 5,
      name: "Campus East",
      university: "UNSW",
      imageUrl: "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&q=80&w=800",
      rating: 4.1,
      reviewCount: 112,
      price: "A$330/week",
      features: ["Dining Hall", "Study Rooms", "WiFi"],
    },
    {
      id: 6,
      name: "International House",
      university: "University of Sydney",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      rating: 4.3,
      reviewCount: 78,
      price: "A$360/week",
      features: ["WiFi", "Meals Included", "Events"],
    }
  ];

  // Filter results by university if not "All Universities"
  const filteredDorms = universityQuery === "All Universities" 
    ? mockDorms 
    : mockDorms.filter(dorm => dorm.university === universityQuery);

  return (
      <main className="">
        {/* Search hero section */}
        <div className="bg-blue-900/10 py-8">
          <div className="max-w-7xl  w-fit flex mx-auto">
            <SearchBar initialUniversity={universityQuery} />
          </div>
        </div>

        {/* Results section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2 mr-auto text-start">
                {filteredDorms.length} Results Found
              </h2>
              <p className="text-gray-600">
                {universityQuery !== "All Universities" 
                  ? `Student accommodations near ${universityQuery}`
                  : "Student accommodations across Australia"}
              </p>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <Filter className="mr-2 h-5 w-5 text-gray-500" />
              <span className="mr-3">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results grid */}
          {filteredDorms.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No dorms found. Try adjusting your search criteria.</p>
              <Button variant="outline" className="mt-4">
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDorms.map((dorm) => (
                <DormCard
                  key={dorm.id}
                  name={dorm.name}
                  university={dorm.university}
                  imageUrl={dorm.imageUrl}
                  rating={dorm.rating}
                  reviewCount={dorm.reviewCount}
                  price={dorm.price}
                  features={dorm.features}
                />
              ))}
            </div>
          )}
        </div>
      </main>
  );
};
