// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Actions
import {
  getAllFilteredProducts,
  getProductDetails,
} from "@/store/user/products.slice.js";

import { addToCart, getCartItems } from "@/store/user/cart.slice.js";

// Components
import Filter from "@/components/user/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import { ArrowUpDownIcon } from "lucide-react";

import { sortOptions } from "@/config/index.js";
import UserProducts from "@/components/user/Products";
import ProductDetails from "@/components/user/ProductDetails";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
};

const ProductListing = () => {
  const dispatch = useDispatch();
  const { products, productDetails } = useSelector(
    (state) => state.userProducts
  );
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [openDetail, setOpenDetail] = useState(false);

  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");

  console.log(productDetails, "productDetails");

  const sortHandler = (value) => {
    console.log(value, "value");
    setSort(value);
  };

  const filterHandler = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOption);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(copyFilters);
    localStorage.setItem("filters", JSON.stringify(copyFilters));
  };
  // console.log(filters, searchParams, "filters");

  const getProductDetailsHandler = (productId) => {
    dispatch(getProductDetails(productId));
  };

  const addToCartHandler = (productId) => {
    console.log(user, "user");
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

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(localStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // Fetch products
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        getAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetail(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <Filter filters={filters} filterHandler={filterHandler} />
      <div className="w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold mr-2">All products</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">{products?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={sortHandler}
                >
                  {sortOptions.map((sortOption) => (
                    <DropdownMenuRadioItem
                      value={sortOption.id}
                      key={sortOption.id}
                    >
                      {sortOption.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products && products.length > 0
            ? products.map((product) => {
                return (
                  <UserProducts
                    key={product?._id}
                    product={product}
                    getProductDetailsHandler={getProductDetailsHandler}
                    addToCartHandler={addToCartHandler}
                  />
                );
              })
            : null}
        </div>
      </div>
      <ProductDetails
        open={openDetail}
        setOpen={setOpenDetail}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ProductListing;
