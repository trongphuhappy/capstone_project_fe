import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  categories: API.ICategoryDescriptions[];
  furniture?: API.ICategoryDescriptions[];
  vehicles?: API.ICategoryDescriptions[];
}

const initialState: InitialState = {
  categories: [],
  status: "idle",
  furniture: [],
  vehicles: [],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.status = "idle";
      state.categories = [];
      state.furniture = [];
      state.vehicles = [];
    },
    getCategoriesPending: (state) => {
      state.status = "loading";
    },
    getCategoriesSuccess: (
      state,
      action: PayloadAction<API.ICategoryDescriptions[]>
    ) => {
      state.status = "succeeded";
      state.categories = action.payload;
      state.furniture = state.categories.filter((category) =>
        category.name.includes("furniture")
      );
      state.vehicles = state.categories.filter((category) =>
        category.name.includes("vehicle")
      );
    },
    getCategoriesFailed: (state) => {
      state.status = "failed";
      state.categories = [];
      state.furniture = [];
      state.vehicles = [];
    },
  },
});

export const {
  resetCategories,
  getCategoriesPending,
  getCategoriesSuccess,
  getCategoriesFailed,
} = categorySlice.actions;

export default categorySlice.reducer;
