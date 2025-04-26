"use client"

import { DormCard } from "@/components/ui/DormCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const HighlightedDorms = () => {
  const [activeTab, setActiveTab] = useState("highest-rated");
  
  const dormData = [
    {
      name: "UniLodge @ UNSW",
      university: "UNSW Sydney",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
      rating: 4.8,
      reviewCount: 312,
      price: "From $320/week",
      features: ["Wi-Fi", "Gym", "Study Rooms"]
    },
    {
      name: "Sydney Uni Village",
      university: "University of Sydney",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80",
      rating: 4.7,
      reviewCount: 256,
      price: "From $290/week",
      features: ["Pool", "Furnished", "Security"]
    },
    {
      name: "Melbourne Uni Apartments",
      university: "University of Melbourne",
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
      rating: 4.6,
      reviewCount: 198,
      price: "From $305/week",
      features: ["Air-Con", "En-suite", "Cafe"]
    },
    {
      name: "ANU Residences",
      university: "Australian National University",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
      rating: 4.5,
      reviewCount: 145,
      price: "From $275/week",
      features: ["Meal Plan", "Study Spaces", "Laundry"]
    }
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Highlighted Student Dorms in Australia</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore popular student accommodations across Australian universities
          </p>
        </div>
        
        <Tabs defaultValue="highest-rated" className="w-full mb-8">
          
          <TabsContent value="highest-rated" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dormData.map((dorm, index) => (
                <DormCard key={index} {...dorm} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="most-reviewed" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...dormData].sort((a, b) => b.reviewCount - a.reviewCount).map((dorm, index) => (
                <DormCard key={index} {...dorm} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="best-value" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...dormData].sort((a, b) => {
                const priceA = parseInt(a.price.replace(/\D/g, ''));
                const priceB = parseInt(b.price.replace(/\D/g, ''));
                return priceA - priceB;
              }).map((dorm, index) => (
                <DormCard key={index} {...dorm} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-10">
          <Button className="bg-blue-900 hover:bg-blue-800">
            View All Dorms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HighlightedDorms;
