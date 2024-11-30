import { addRentProduct, removeRentProduct } from "@/stores/rentSlice";
import {
  closeRentProductDialog,
  openRentProductDialog,
} from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useRentDialog() {
  const dispatch = useAppDispatch();

  const rentDialogState = useAppSelector(
    (state) => state.stateSlice.rentDialog
  );

  const onOpenRentProductDialog = (product: API.TProduct) => {
    dispatch(openRentProductDialog());
    dispatch(addRentProduct(product));
  };

  const onCloseRentProductDialog = () => {
    dispatch(closeRentProductDialog());
    dispatch(removeRentProduct());
  };

  return {
    open: rentDialogState.open,
    onOpenRentProductDialog,
    onCloseRentProductDialog,
  };
}
