import { confirmStatus } from "@/const/products";
import { addReviewProduct, removeReviewProduct } from "@/stores/productSlice";
import {
  closeCensorProductDialog,
  openCensorProductDialog,
} from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useCensorProductDialog() {
  const dispatch = useAppDispatch();

  const censorProductDialogState = useAppSelector(
    (state) => state.stateSlice.censorProductDialog
  );

  const onOpenCensorProductDialog = (type: confirmStatus, product: API.TProduct) => {
    dispatch(openCensorProductDialog(type));
    dispatch(addReviewProduct(product));
  };

  const onCloseCensorProductDialog = () => {
    dispatch(closeCensorProductDialog());
    dispatch(removeReviewProduct());
  };

  return {
    open: censorProductDialogState.open,
    type: censorProductDialogState.type,
    onOpenCensorProductDialog,
    onCloseCensorProductDialog,
  };
}
