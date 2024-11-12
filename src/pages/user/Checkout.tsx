import image from "@/assets/account.jpg";
import { Button } from "@/components/ui/button";
import Address from "@/components/user/Address";
import CartItemsContent from "@/components/user/CartContent";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={image}
          alt="pic"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((cartItem) => (
                <CartItemsContent key={cartItem?.id} cartItem={cartItem} />
              ))
            : null}
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalAmount}</span>
          </div>
        </div>
        <div className="mt-4 w-full">
          <Button className="mt-4 w-full">Checkout with PayPal</Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
