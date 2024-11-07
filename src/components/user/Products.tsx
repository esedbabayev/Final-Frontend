import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const UserProducts = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600"></Badge>
          ) : (
            ""
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProducts;
