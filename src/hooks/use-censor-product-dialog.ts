import { confirmStatus } from "@/const/products";
import { addReviewProduct, removeReviewProduct } from "@/stores/product-slice";
import {
  closeCensorProductDialog,
  openCensorProductDialog,
} from "@/stores/state-slice";
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
