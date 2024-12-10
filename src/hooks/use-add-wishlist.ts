import { useServiceAddWishlistProduct } from "@/services/product/services";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import useToast from "@/hooks/use-toast";
import { openBackdrop } from "@/stores/state-slice";

export default function useAddWishlist() {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  const { mutate } = useServiceAddWishlistProduct();
  const userState = useAppSelector((state) => state.userSlice.profile);

  const addWishlistProduct = async (
    params: REQUEST.TAddToWishlist,
    handleAddHeart: () => void
  ) => {
    if (userState !== null) {
      dispatch(openBackdrop());
      mutate(params, {
        onSuccess: () => {
          handleAddHeart();
        },
      });
    } else {
      addToast({
        type: "error",
        description: "Please login to add to wishlist",
      });
    }
  };

  return { addWishlistProduct };
}
