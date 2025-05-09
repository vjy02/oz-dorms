
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

interface DormCardProps {
  id?: string;
  name: string;
  university: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export const DormCard = ({
  id,
  name,
  university,
  imageUrl,
  rating,
  reviewCount,
}: DormCardProps) => {
  return (
    <Link href={`dorm/${id}`}>
    <Card className="overflow-hidden hover:shadow-lg h-full flex flex-col hover:scale-[101%] hover:cursor-pointer transition-all duration-300 p-0">
        <AspectRatio ratio={16/9} className="">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      <CardHeader className="pb-2">
        <CardTitle className="font-bold text-lg text-blue-900">{name}</CardTitle>
        <CardDescription className="text-gray-500">{university}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex mb-3 items-center">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {rating} 
          </span>
        </div>
        <span className="text-sm text-gray-500">
        {reviewCount} reviews
        </span>
      </CardContent>
      <CardFooter className="mt-auto">
      {/* <div className="flex flex-wrap gap-1 mt-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div> */}
      </CardFooter>
    </Card>
    </Link>
  );
};

export default DormCard;
