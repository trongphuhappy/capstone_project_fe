import { getCategories } from "@/services/product-categories/api-services";
import {
  getCategoriesFailed,
  getCategoriesPending,
  getCategoriesSuccess,
} from "@/stores/categorySlice";
import { store } from "@/stores/store";

export const useServiceProductCategories = async (isVehicle?: boolean) => {
  store.dispatch(getCategoriesPending());
  try {
    const response = await getCategories({
      isVehicle: isVehicle,
    });
    store.dispatch(getCategoriesSuccess(response.result.data));
  } catch (err) {
    store.dispatch(getCategoriesFailed());
    return err;
  }
};
