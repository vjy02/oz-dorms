
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-200 text-white py-20 md:py-32">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Student Home in Australia</h1>
          <p className="text-xl mb-10">
            Discover, compare and review the best student dorms across Australian universities
          </p>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-lg md:w-1/2 md:mx-auto">
            <CardContent className="p-0 m-0">
              <SearchBar />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
