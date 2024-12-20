import {
  addQuickViewProduct,
  removeQuickViewProduct,
} from "@/stores/quick-view-product-slice";
import {
  closeQuickViewProductDialog,
  openQuickViewProductDialog,
} from "@/stores/state-slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useQuickViewProduct() {
  const dispatch = useAppDispatch();

  const quickViewProductDialogState = useAppSelector(
    (state) => state.stateSlice.quickViewProduct
  );

  const quickViewProductState = useAppSelector(
    (state) => state.quickViewProductSlice.product
  );

  const onOpenQuickViewProductDialog = (product: API.TProduct) => {
    dispatch(openQuickViewProductDialog());
    dispatch(addQuickViewProduct(product));
  };

  const onCloseQuickViewProductDialog = () => {
    dispatch(closeQuickViewProductDialog());
    dispatch(removeQuickViewProduct());
  };

  return {
    open: quickViewProductDialogState.open,
    quickViewProduct: quickViewProductState,
    onOpenQuickViewProductDialog,
    onCloseQuickViewProductDialog,
  };
}
