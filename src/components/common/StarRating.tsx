import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

const StarRating = ({ rating, ratingChangeHandler }) => {
  console.log(rating, "rating");
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`p-2 rounded-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-white"
      }`}
      variant={"outline"}
      size={"icon"}
      onClick={ratingChangeHandler ? () => ratingChangeHandler(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
};

export default StarRating;
