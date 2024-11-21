import request from "@/services/interceptor";
import { GET_CATEGORIES } from "@/services/product-categories/api-path";

export const getCategories = async (categoryOptions?: REQUEST.ICategories) => {
  const params: Record<string, any> = {};
  if (categoryOptions?.id) params.id = categoryOptions.id;
  if (categoryOptions?.name) params.name = categoryOptions.name;
  if (categoryOptions?.isVehical) params.isVehical = categoryOptions.isVehical;
  if (categoryOptions?.pageIndex) params.pageIndex = categoryOptions.pageIndex;
  if (categoryOptions?.pageSize) params.pageSize = categoryOptions.pageSize;
  const response = await request<TResponseData<API.TGetCategories>>(
    GET_CATEGORIES,
    {
      method: "GET",
      params: Object.keys(params).length > 0 ? params : undefined,
    }
  );
  return response.data;
};
