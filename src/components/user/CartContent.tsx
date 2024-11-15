// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

// Actions
import {
  removeCartItem,
  updateCartItemQuantity,
} from "@/store/user/cart.slice.js";

// Components
import { Button } from "../ui/button";

// Icons
import { Minus, Plus, Trash } from "lucide-react";

const CartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.userProducts);

  const { toast } = useToast();

  const removeCartItemHandler = (cartItem) => {
    dispatch(
      removeCartItem({ userId: user?.id, productId: cartItem?.productId })
    );
  };

  const updateQuantityHandler = (cartItem, actionType: string) => {
    if (actionType === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === cartItem?.productId
        );

        const getCurrentProductIndex = products.findIndex(
          (product) => product._id === cartItem?.productId
        );
        const getTotalStock = products[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    // console.log(cartItem);
    dispatch(
      updateCartItemQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          actionType === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    );
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-8 h-8 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => updateQuantityHandler(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-8 h-8 rounded-full"
            onClick={() => updateQuantityHandler(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => removeCartItemHandler(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default CartItemsContent;
