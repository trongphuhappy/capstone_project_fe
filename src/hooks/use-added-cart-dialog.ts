// import {
//   addCartProduct,
//   clearCartProduct,
//   removeCartProduct,
// } from "@/stores/cartSlice";
// import { closeAddedCartDialog, openAddedCartDialog } from "@/stores/stateSlice";
// import { useAppDispatch, useAppSelector } from "@/stores/store";

// export default function useAddedCartDialog() {
//   const dispatch = useAppDispatch();

//   const addedCartDialogState = useAppSelector(
//     (state) => state.stateSlice.addedCartDialog
//   );

//   const cartState = useAppSelector((state) => state.cartSlice);

//   const onOpenAddedCartDialog = (product: API.IProductCard) => {
//     dispatch(addCartProduct(product));
//     dispatch(openAddedCartDialog());
//   };

//   const onCloseAddedCartDialog = () => {
//     dispatch(closeAddedCartDialog());
//   };

//   const onRemoveProductCart = (index: number) => {
//     dispatch(removeCartProduct(index));
//   };

//   const onClearProductCart = () => {
//     dispatch(clearCartProduct());
//   };

//   return {
//     open: addedCartDialogState.open,
//     products: cartState.products,
//     onOpenAddedCartDialog,
//     onCloseAddedCartDialog,
//     onRemoveProductCart,
//     onClearProductCart,
//   };
// }
