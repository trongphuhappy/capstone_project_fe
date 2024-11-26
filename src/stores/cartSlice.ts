// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface InitialState {
//   products: API.IProductCard[];
// }

// const initialState: InitialState = {
//   products: [],
// };

// const cartSlice = createSlice({
//   name: "cartSlice",
//   initialState: initialState,
//   reducers: {
//     addCartProduct: (state, action: PayloadAction<API.IProductCard>) => {
//       state.products?.unshift(action.payload);
//     },
//     removeCartProduct: (state, action: PayloadAction<number>) => {
//       const index = action.payload;
//       state.products.splice(index, 1);
//     },
//     clearCartProduct: (state) => {
//       state.products = [];
//     },
//   },
// });

// export const { addCartProduct, removeCartProduct, clearCartProduct } =
//   cartSlice.actions;

// export default cartSlice.reducer;
