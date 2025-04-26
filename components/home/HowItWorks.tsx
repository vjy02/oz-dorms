import { Search, Star, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-blue-900" />,
      title: "Search",
      description:
        "Easily search and filter through hundreds of student dorms across Australia based on location, price, and amenities.",
    },
    {
      icon: <User className="h-12 w-12 text-blue-900" />,
      title: "Compare",
      description:
        "View detailed information about each dorm including photos, floor plans, pricing, and authentic student reviews.",
    },
    {
      icon: <Star className="h-12 w-12 text-blue-900" />,
      title: "Review",
      description:
        "Share your experience by writing a review and help future students make informed decisions about their accommodation.",
    },
  ];

  return (
    <div className="py-16 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {" "}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding the perfect student accommodation has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border shadow-md">
              <CardHeader className="pt-6 pb-2 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-50 p-4 rounded-full">{step.icon}</div>
                </div>
                <CardTitle className="text-xl font-semibold text-blue-900">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
