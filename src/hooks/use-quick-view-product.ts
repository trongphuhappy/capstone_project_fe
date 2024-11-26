// import {
//   closeQuickProductViewDialog,
//   openQuickViewProductDialog,
// } from "@/stores/stateSlice";
// import { useAppDispatch, useAppSelector } from "@/stores/store";

// export default function useQuickViewProduct() {
//   const dispatch = useAppDispatch();

//   const quickViewProductDialogState = useAppSelector(
//     (state) => state.stateSlice.quickViewProduct
//   );

//   const onOpenQuickViewProductDialog = (product: API.IProductCard) => {
//     dispatch(openQuickViewProductDialog(product));
//   };

//   const onCloseQuickViewProductDialog = () => {
//     dispatch(closeQuickProductViewDialog());
//   };

//   return {
//     open: quickViewProductDialogState.open,
//     product: quickViewProductDialogState.product,
//     onOpenQuickViewProductDialog,
//     onCloseQuickViewProductDialog,
//   };
// }
