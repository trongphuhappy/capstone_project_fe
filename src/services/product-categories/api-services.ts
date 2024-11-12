import request from "@/services/interceptor";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORIES_DETAILS,
} from "@/services/product-categories/api-path";
import { TMetaWrapper } from "@/typings";

export const getCategories = async (
  categoryOptions?: API.ICategoriesParams
) => {
  const res = await request<TMetaWrapper<API.ICategoryDescriptions[]>>(
    PRODUCT_CATEGORIES,
    {
      method: "GET",
      params: categoryOptions,
    }
  );
  return res.data;
};

export const getCategoriesDetails = async (categoryId?: number | string) => {
  const response = await request<TMetaWrapper<API.ICategoryDetails>>(
    PRODUCT_CATEGORIES_DETAILS,
    {
      method: "GET",
      params: {
        categoryId: categoryId,
      },
    }
  );
  return response.data;
};
