// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getAllFilteredProducts } from "@/store/user/products.slice.js";

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

const ProductListing = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.userProducts);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  // console.log(products, "products");

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
  console.log(filters, "filters");

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(localStorage.getItem("filters")) || {});
  }, []);

  // Fetch products
  useEffect(() => {
    dispatch(getAllFilteredProducts());
  }, [dispatch]);

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
                return <UserProducts key={product?._id} product={product} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
