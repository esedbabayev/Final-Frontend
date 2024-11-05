// Components
import Filter from "@/components/user/Filter";

const ProductListing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <Filter />
    </div>
  );
};

export default ProductListing;
