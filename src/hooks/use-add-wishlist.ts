import { useServiceAddWishlistProduct } from "@/services/product/services";
import { openBackdrop } from "@/stores/stateSlice";
import { useAppDispatch } from "@/stores/store";

export default function useAddWishlist() {
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useServiceAddWishlistProduct();

  const addWishlistProduct = async (params: REQUEST.TAddToWishlist) => {
    dispatch(openBackdrop());
    mutate(params);
  };

  return { addWishlistProduct };
}