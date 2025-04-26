"use client"

import { useState } from "react";
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
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

// Mock data for dormitory details
const mockDorms = [
  {
    id: "1",
    name: "University Hall",
    university: "University of Melbourne",
    address: "48 College Crescent, Parkville VIC 3052",
    description:
      "University Hall is a residential college located on the edge of the University of Melbourne's main campus. Built in the traditional collegiate style, it offers a supportive and enriching environment for students pursuing their tertiary studies.",
    imageUrl:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1573919664876-e4306bb46559?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    ],
    rating: 4.5,
    reviewCount: 128,
    features: [
      { name: "WiFi", icon: <Wifi className="h-4 w-4" /> },
      { name: "Gym", icon: <Dumbbell className="h-4 w-4" /> },
      { name: "Dining Hall", icon: <UtensilsCrossed className="h-4 w-4" /> },
      { name: "Parking", icon: <Car className="h-4 w-4" /> },
      { name: "Security", icon: <LockKeyhole className="h-4 w-4" /> },
    ],
    roomTypes: [
      { type: "Single Room", price: "A$350/week", size: "16m²" },
      { type: "Double Room", price: "A$290/week", size: "24m²" },
      { type: "Studio Apartment", price: "A$450/week", size: "30m²" },
    ],
    amenities: [
      "Free WiFi",
      "Laundry Facilities",
      "24-hour Security",
      "Study Spaces",
      "Common Rooms",
      "Dining Hall",
      "Gym",
      "Outdoor Areas",
      "Bike Storage",
    ],
    reviews: [
      {
        id: 1,
        user: "Alex P.",
        rating: 5,
        date: "10/12/2024",
        comment:
          "Living at University Hall has been a fantastic experience. The community is welcoming, the facilities are well maintained, and the location is perfect for accessing campus.",
        helpful: 24,
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      {
        id: 2,
        user: "Jordan T.",
        rating: 4,
        date: "01/10/2024",
        comment:
          "Great facilities and staff, but can get noisy during exam periods. Overall a good place to stay during university.",
        helpful: 18,
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      {
        id: 3,
        user: "Sam R.",
        rating: 4.5,
        date: "01/05/2025",
        comment:
          "Excellent location and community. The rooms are a bit small but the common areas make up for it. Dining hall food is surprisingly good!",
        helpful: 32,
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      {
        id: 4,
        user: "Taylor M.",
        rating: 5,
        date: "02/12/2024",
        comment:
          "This is my second year at University Hall and I couldn't be happier. The social events are great, and I've made friends for life here. The staff really care about student wellbeing and are always available to help.",
        helpful: 45,
        avatar: "https://i.pravatar.cc/100?img=4",
      },
      {
        id: 5,
        user: "Jamie L.",
        rating: 3.5,
        date: "01/03/2024",
        comment:
          "The location is perfect for university access, but the internet can be slow during peak hours. Room cleaning service is excellent though!",
        helpful: 12,
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      {
        id: 6,
        user: "Casey D.",
        rating: 4,
        date: "05/02/2024",
        comment:
          "Decent accommodation with good amenities. The gym is small but well-equipped. Common areas are spacious and great for socializing or studying in groups.",
        helpful: 27,
        avatar: "https://i.pravatar.cc/100?img=6",
      },
    ],
    reviewCategories: [
      { name: "Room", rating: 4.8 },
      { name: "Building", rating: 4.3 },
      { name: "Bathroom", rating: 4.6 },
      { name: "Location", rating: 3.9 },
    ],
  },
  // You can add more mock dorms here
];

export default function Page (){
const router = useRouter();
  const dormId = usePathname();
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const dorm = mockDorms.find((d) => d.id === dormId) || mockDorms[0]; // Default to first dorm if not found

  const [selectedImage, setSelectedImage] = useState(dorm.imageUrl);


  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could use a toast notification here
    alert("Link copied to clipboard!");
  };


  // NEW: function to go to review page with dorm/university preselected
  const goToReviewPage = () => {
    router.push(`/review?university=${encodeURIComponent(dorm.university)}&dorm=${encodeURIComponent(dorm.name)}`);
  };

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
                <span>{dorm.address}</span>
              </div>
            </div>
            <div className="flex mt-4 md:mt-0 gap-2 md:place-self-start">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="default"
                className="bg-blue-900 text-white"
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
                  <img
                    src={selectedImage}
                    alt={dorm.name}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>

              {/* Photo thumbnails */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div
                  className={`cursor-pointer rounded-md overflow-hidden ${
                    selectedImage === dorm.imageUrl
                      ? "ring-2 ring-blue-900"
                      : ""
                  }`}
                  onClick={() => setSelectedImage(dorm.imageUrl)}
                >
                  <AspectRatio ratio={1 / 1}>
                    <img
                      src={dorm.imageUrl}
                      alt={`${dorm.name} 1`}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
                {dorm.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className={`cursor-pointer rounded-md overflow-hidden ${
                      selectedImage === img ? "ring-2 ring-blue-900" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src={img}
                        alt={`${dorm.name} ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>

              {/* Reviews list */}
              <div className="space-y-6 text-start">
                {dorm.reviews.map((review) => (
                  <Card key={review.id} className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="text-lg text-gray-500">
                          {review.date}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(review.rating)
                                  ? "text-secondary-gold fill-secondary-gold"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
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
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(dorm.rating)
                              ? "text-secondary-gold fill-secondary-gold"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold">
                        {dorm.rating}
                      </span>
                    </div>
                  </div>{" "}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-between justify-between mb-2 flex-col">
                    <div className="grid grid-cols-1 gap-4">
                      {dorm.reviewCategories.map((category, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <div className="flex justify-between w-full">
                            <span className="font-medium">{category.name}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={`${
                                    i < Math.floor(dorm.rating)
                                      ? "text-secondary-gold fill-secondary-gold"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-sm font-semibold">
                                {dorm.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4 text-start">
                    <h4 className="font-bold mb-2 text-center">Summary</h4>
                    <p className="text-sm">
                      Sed iaculis non risus a egestas. Aenean volutpat tempus
                      volutpat. Maecenas sit amet massa risus. Cras volutpat
                      porttitor convallis. Aenean viverra, augue posuere gravida
                      dapibus, ipsum leo gravida leo, ut placerat augue velit
                      non quam. Curabitur quis volutpat urna, sit amet euismod
                      est. Curabitur tincidunt orci nulla, nec porttitor lorem
                      varius non. Morbi suscipit quis est sit amet tincidunt.
                      Morbi suscipit lectus sed mauris pharetra hendrerit.
                      Suspendisse a quam velit. Maecenas tempus aliquet
                      eleifend.
                    </p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-bold mb-2">Location</h4>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.8738765798666!2d144.9629582!3d-37.8033608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64310135f1fe9%3A0xe7cf012b19983cc0!2sLittle%20Hall%20%E2%80%93%20University%20of%20Melbourne!5e1!3m2!1sen!2sau!4v1745323310669!5m2!1sen!2sau"
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
};