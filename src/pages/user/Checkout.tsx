// Hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { createNewOrder } from "../../store/user/order.slice.js";

// Images
import image from "@/assets/account.jpg";

// Components
import { Button } from "@/components/ui/button";
import Address from "@/components/user/Address";
import CartItemsContent from "@/components/user/CartContent";
import { useToast } from "@/hooks/use-toast.js";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const { approvalURL } = useSelector((state) => state.order);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const dispatch = useDispatch();

  const { toast } = useToast();

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

  // console.log(currentSelectedAddress, "currentSelectedAddress");

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "data");
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  // console.log(approvalURL);

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((cartItem, index) => (
                <CartItemsContent key={index} cartItem={cartItem} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypalPayment}
              className="mt-4 w-full"
            >
              Checkout with PayPal
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
