import {
  closeQuickProductViewDialog,
  openQuickViewProductDialog,
} from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useQuickViewProduct() {
  const dispatch = useAppDispatch();

  const quickViewProductDialogState = useAppSelector(
    (state) => state.stateSlice.quickViewProduct
  );

  const onOpenQuickViewProductDialog = () => {
    dispatch(openQuickViewProductDialog());
  };

  const onCloseQuickViewProductDialog = () => {
    dispatch(closeQuickProductViewDialog());
  };

  return {
    open: quickViewProductDialogState.open,
    onOpenQuickViewProductDialog,
    onCloseQuickViewProductDialog,
  };
}
