import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICategoryDescriptions {
  id: number;
  name: string;
  value?: string;
}

export interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  categories: ICategoryDescriptions[];
  furniture?: ICategoryDescriptions[];
  vehicles?: ICategoryDescriptions[];
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
      action: PayloadAction<ICategoryDescriptions[]>
    ) => {
      state.status = "succeeded";
      state.categories = action.payload.map((category) => ({
        ...category,
        value: formatCategoryName(category.name),
      }));
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

const formatCategoryName = (name: string): string => {
  const category = name.split(".").pop();
  return category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
    : name;
};
