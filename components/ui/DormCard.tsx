
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

interface DormCardProps {
  id?: number;
  name: string;
  university: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  price: string;
  features: string[];
}

export const DormCard = ({
  id = 1,
  name,
  university,
  imageUrl,
  rating,
  reviewCount,
  price,
  features
}: DormCardProps) => {
  return (
    <Link href={`dorm/${id}`}>
    <Card className="overflow-hidden hover:shadow-lg h-full flex flex-col hover:scale-[101%] hover:cursor-pointer transition-all duration-300">
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-bold text-lg text-blue-900">{name}</CardTitle>
        <CardDescription className="text-gray-500">{university}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? "text-secondary-gold fill-secondary-gold"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {rating} ({reviewCount} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
      <div className="flex flex-wrap gap-1 mt-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
    </Link>
  );
};

export default DormCard;
