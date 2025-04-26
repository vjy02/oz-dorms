"use client"

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DormCard from "@/components/ui/DormCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const selectedCompany = useSearchParams().get("company");  
  const companyQuery = selectedCompany ?? "All in VIC";  
  const [sortBy, setSortBy] = useState("rating");
  const [dorms, setDorms] = useState<any[]>([]); // Always initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const response = await fetch(`/api/get-company?company=${encodeURI(companyQuery)}`);
        const { data } = await response.json();
        setDorms(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDorms();
  }, [companyQuery]); 
console.log(dorms)
  return (
    <main className="">

      {/* Search hero section */}
      <div className="bg-blue-900/10 py-8">
        <div className="max-w-7xl w-fit flex mx-auto">
          <SearchBar initialUniversity={companyQuery} />
        </div>
      </div>

      {/* Results section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2 mr-auto text-start">
              {dorms.length} Results Found
            </h2>
            <p className="text-gray-600">
              {companyQuery !== "All Companies"
                ? `Student accommodations near ${companyQuery}`
                : "Student accommodations across Australia"}
            </p>
          </div>
        </div>

        {/* Loading and Error Handling */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Loading dorm data...</p>
          </div>
        )}

        {/* Results grid */}
        {(dorms.length === 0 || !dorms) && !loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No dorms found. Try adjusting your search criteria.
            </p>
            <Button variant="outline" className="mt-4">
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dorms.map((dorm) => (
              <DormCard
                key={dorm.id}
                id={dorm.id}
                name={dorm.name}
                university={dorm.company}
                imageUrl={"https://media.istockphoto.com/id/492965853/photo/university-college-dorm-room-with-bunkbeds-empty-unoccupied-student-bedroom.jpg?s=612x612&w=0&k=20&c=se0Dsy9AwP240fgPs10Fz39uPZR8PgPYn8hiFwhZf58="}
                rating={dorm.overall_rating ? (Math.round(dorm.overall_rating * 100)/100) : 0} 
                reviewCount={dorm.review_count ?? 0} 
              />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
