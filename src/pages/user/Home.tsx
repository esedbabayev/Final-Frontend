// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Actions
import {
  getAllFilteredProducts,
  getProductDetails,
} from "@/store/user/products.slice.js";
import { addToCart, getCartItems } from "@/store/user/cart.slice.js";
import {
  addFeatureImage,
  getFeatureImages,
} from "@/store/admin/feature.slice.js";

// Banner images
import BannerOne from "@/assets/banner-1.webp";
import BannerTwo from "@/assets/banner-2.webp";
import BannerThree from "@/assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Icons
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Columns3,
  Footprints,
  Pill,
  ShirtIcon,
  ShoppingBag,
  WatchIcon,
} from "lucide-react";
import { SiNike } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiPuma } from "react-icons/si";
import { SiZara } from "react-icons/si";

// Components
import UserProducts from "@/components/user/Products";
import ProductDetails from "@/components/user/ProductDetails";

const categories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: ShoppingBag },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brands = [
  { id: "nike", label: "Nike", icon: SiNike },
  { id: "adidas", label: "Adidas", icon: SiAdidas },
  { id: "puma", label: "Puma", icon: SiPuma },
  { id: "levi", label: "Levi's", icon: Pill },
  { id: "zara", label: "Zara", icon: SiZara },
  { id: "h&m", label: "H&M", icon: Columns3 },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const slides = [BannerOne, BannerTwo, BannerThree];

  const dispatch = useDispatch();
  const { products, productDetails } = useSelector(
    (state) => state.userProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { featureImageList } = useSelector((state) => state.feature);

  const navigate = useNavigate();

  const { toast } = useToast();

  const [openDetail, setOpenDetail] = useState(false);

  const navigateToListingPageHandler = (currentItem, section: string) => {
    localStorage.removeItem("filters");

    const currentFilter = {
      [section]: [currentItem.id],
    };

    localStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/product-listing");
  };

  const getProductDetailsHandler = (productId) => {
    dispatch(getProductDetails(productId));
  };

  const addToCartHandler = (productId) => {
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(getCartItems(user?.id));
          toast({
            title: data?.payload?.message,
          });
        }
      }
    );
  };

  const filterParams = {};
  const sortParams = "price-lowtohigh";

  // console.log(products, "products");
  useEffect(() => {
    if (productDetails !== null) setOpenDetail(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(getAllFilteredProducts(filterParams, sortParams));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                key={index}
                src={slide?.image}
                alt=""
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() =>
                  navigateToListingPageHandler(category, "category")
                }
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Card
                key={brand.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigateToListingPageHandler(brand, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brand.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products && products.length > 0
              ? products?.map((product, index) => (
                  <UserProducts
                    key={index}
                    product={product}
                    addToCartHandler={addToCartHandler}
                    getProductDetailsHandler={getProductDetailsHandler}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetail}
        setOpen={setOpenDetail}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Home;
