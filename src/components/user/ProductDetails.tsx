import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

// Actions
import { addToCart, getCartItems } from "@/store/user/cart.slice.js";
import { setProductDetails } from "@/store/user/products.slice.js";
import { addReview, getReviews } from "@/store/user/review.slice.js";

// Components
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

// Icons
import { StarIcon } from "lucide-react";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { reviews } = useSelector((state) => state.review);

  const { toast } = useToast();

  const ratingChangeHandler = (getRating) => {
    setRating(getRating);
  };

  const addReviewHandler = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added succesfully",
        });
      }
    });
  };

  const addToCartHandler = (productId, getTotalStock) => {
    let obtainCartItems = cartItems.items || [];

    if (obtainCartItems.length) {
      const indexOfCurrentItem = obtainCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = obtainCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only quantity of ${getQuantity} can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    console.log(user, "user");
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          setRating(0);
          setReviewMsg("");
          dispatch(getCartItems(user?.id));
          toast({
            title: data?.payload?.message,
          });
        }
      }
    );
  };

  const dialogCloseHandler = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  console.log(reviews, "reviews");

  return (
    <Dialog open={open} onOpenChange={dialogCloseHandler}>
      <DialogContent className="grid grid-cols-2 gap-8 max-w-[90vw] sm:p-12 sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-gray-700 text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-gray-500">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex itemc-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRating rating={averageReview} />
            </div>
            <span className="text-gray-700">({averageReview.toFixed(1)})</span>
          </div>
          <div className="my-5">
            {productDetails?.totalStock === 0 ? (
              <Button disabled className="w-full opacity-60 cursor-not-allowed">
                Out of stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  addToCartHandler(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full"
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {/* review */}

              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review?._id} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {review?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={review?.reviewValue} />
                      </div>
                      <p className="text-gray-700">{review?.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h2>No reviews</h2>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRating
                  rating={rating}
                  ratingChangeHandler={ratingChangeHandler}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review"
              />
              <Button
                onClick={addReviewHandler}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
