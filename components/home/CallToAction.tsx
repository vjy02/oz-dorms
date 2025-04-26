import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export const CallToAction = () => {
  return (
    <div className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Share Your Dorm Experience</h2>
            <p className="text-lg text-blue-100 max-w-md">
              Help future students find their perfect accommodation by submitting your dorm details. Every contribution helps!
            </p>
          </div>

          <Card className="w-full md:w-1/3 bg-white text-foreground">
            <CardHeader>
              <CardTitle className="text-blue-900 text-xl">Submit a Dorm</CardTitle>
              <CardDescription>
                Share details about a dorm that isn't listed yet. Let’s make sure no dorm is left behind.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  placeholder="Dorm name"
                  className="h-12"
                />
                <Input
                  type="text"
                  placeholder="Location or University"
                  className="h-12"
                />
                <Button className="h-12 bg-blue-900 hover:bg-blue-800">
                  Submit Dorm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
