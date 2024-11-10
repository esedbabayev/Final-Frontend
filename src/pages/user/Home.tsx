// Banner images
import BannerOne from "@/assets/banner-1.webp";
import BannerTwo from "@/assets/banner-2.webp";
import BannerThree from "@/assets/banner-3.webp";
import { Button } from "@/components/ui/button";

// Icons
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";

const Home = () => {
  const slides = [BannerOne, BannerTwo, BannerThree];

  const categories = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt=""
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
