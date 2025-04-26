import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex space-x-4">
              <div  className="text-gray-300 hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </div>
              <div  className="text-gray-300 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </div>
              <div  className="text-gray-300 hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </div>
              <div  className="text-gray-300 hover:text-white">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-gray-300">© {currentYear} Aussie Dorm Reviews. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex">
            <div  className="text-gray-300 hover:text-white mr-4">Privacy Policy</div>
            <div className="text-gray-300 hover:text-white">Terms of Service</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
