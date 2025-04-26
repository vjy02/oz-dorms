"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  ChevronLeft,
  Wifi,
  Dumbbell,
  UtensilsCrossed,
  Car,
  LockKeyhole,
  Ruler,
  MessageSquare,
  ThumbsUp,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { mock } from "node:test";
import Image from "next/image";

// Mock data for dormitory details
const mockDorm = {
  name: "Mock Dorm",
  location: "Mock City",
  galleryImages: [
    "https://images.unsplash.com/photo-1573919664876-e4306bb46559?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
  ],
  ratings: {
    overall_rating: 4.3,
    bathroom_rating: 4.0,
    building_rating: 4.5,
    room_rating: 4.2,
    location_rating: 4.8,
  },
  reviews: [
    {
      id: 1,
      date: "April 1, 2025",
      rating: 4,
      comment: "Great place, clean and spacious!",
    },
    {
      id: 2,
      date: "March 20, 2025",
      rating: 5,
      comment: "Best dorm I've stayed in!",
    },
  ],
  maps_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.8738765798666!2d144.9629582!3d-37.8033608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64310135f1fe9%3A0xe7cf012b19983cc0!2sLittle%20Hall%20%E2%80%93%20University%20of%20Melbourne!5e1!3m2!1sen!2sau!4v1745323310669!5m2!1sen!2sau",
  summary: "",
};

export default function Page() {
  const router = useRouter();
  const dormId = usePathname().replace("/dorm/", "");
  const [reviews, setReviews] = useState([]);
  const [dorm, setDormData] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function fetchDorm() {
      try {
        const res = await fetch(`/api/get-location?id=${dormId}`);
        const resReviews = await fetch(`/api/get-review?id=${dormId}`);
        const { data } = await res.json();
        const { reviewsData } = await resReviews.json();
        setDormData(data);
        setReviews(reviewsData);
        setSelectedImage(data.images[0]);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDorm();
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could use a toast notification here
    alert("Link copied to clipboard!");
  };

  // NEW: function to go to review page with dorm/university preselected
  const goToReviewPage = () => {
    router.push(`/review?id=${dormId}&step=2`);
  };

  if (loading) {
    return <div className="flex flex-col min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:flex md:flex-col md:items-start">
          {/* Dorm title section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:w-full">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2 text-start">
                {dorm.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{dorm.location}</span>
              </div>
            </div>
            <div className="flex mt-4 md:mt-0 gap-2 md:place-self-start">
              {" "}
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="default"
                className="bg-blue-900 text-white hover:bg-blue-800"
                onClick={goToReviewPage}
              >
                <Star className="h-4 w-4 mr-2" />
                Write a Review
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - photos and details */}
            <div className="lg:col-span-2">
              {/* Main photo */}
              <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={selectedImage}
                    alt={dorm.name}
                    height={500}
                    width={500}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </AspectRatio>
              </div>

              {/* Photo thumbnails */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {dorm.images?.map((img, i) => (
                  <div
                    key={i}
                    className={`cursor-pointer rounded-md overflow-hidden ${
                      selectedImage === img ? "ring-2 ring-blue-900" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={img}
                        alt={`${dorm.name} ${i + 1}`}
                        height={500}
                        width={500}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>

              {/* Reviews list */}
              <div className="space-y-6 text-start">
                {reviews?.map((review) => (
                  <Card key={review.id} className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="text-lg text-gray-500">
                          {review.created_at}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(review.overall_rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right column - Student community info instead of booking card */}
            <div>
              <Card className="top-8 mb-6">
                <CardHeader>
                  <div className="flex justify-between">
                    <span className="font-semibold">Overall Rating</span>
                    <div className="flex items-center justify-between w-32">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(dorm.ratings.overall_rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm font-semibold">
                        {dorm.ratings.overall_rating}
                      </span>
                    </div>
                  </div>{" "}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-between justify-between mb-2 flex-col">
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        "bathroom_rating",
                        "building_rating",
                        "room_rating",
                        "location_rating",
                      ].map((category, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <div className="flex justify-between w-full">
                            <span className="font-medium">
                              {category
                                .replace("_", " ")
                                .replace("rating", "Rating")
                                .replace(/^(\w)/, (match) =>
                                  match.toUpperCase()
                                )}
                            </span>
                            <div className="flex items-center justify-between w-32">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={`${
                                      i < Math.floor(dorm.ratings[category])
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-1 text-sm font-semibold justify-self-end">
                                {dorm.ratings[category]}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4 text-start">
                    <h4 className="font-bold mb-2 text-center">Summary</h4>
                    <p className="text-sm">{dorm.summary}</p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-bold mb-2 text-center">Location</h4>
                    <iframe
                      src={dorm.maps_url}
                      style={{ border: "0" }}
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
