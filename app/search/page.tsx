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
  const companyQuery = selectedCompany ?? "all";  
  const [sortBy, setSortBy] = useState("rating");
  const [dorms, setDorms] = useState<any[]>([]); // Always initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const response = await fetch(`/api/get-company?company=${encodeURI(companyQuery)}`);
        const { data } = await response.json();

        // Ensure data is an array before setting it
        setDorms(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDorms();
  }, [companyQuery]);  // Add companyQuery as a dependency for re-fetching when it changes

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

        {error && (
          <div className="text-center py-16">
            <p className="text-xl text-red-600">{error}</p>
          </div>
        )}

        {/* Results grid */}
        {dorms.length === 0 || !dorms ? (
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
                imageUrl={dorm.images[0]}
                rating={5} // Adjust as per the real data
                reviewCount={0} // Adjust as per the real data
              />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
