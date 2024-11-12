import request from "@/services/interceptor";
import API_ENDPOINTS from "@/services/products/api-path";
import { TMetaWrapper } from "@/typings";

export const getProducts = async (pagination: API.IProductPaginationParams) => {
  const response = await request<TMetaWrapper<API.IProductCard[]>>(
    API_ENDPOINTS.PRODUCTS,
    {
      timeout: 15000,
      params: {
        ...pagination,
        take: pagination.take ?? 12,
      },
    }
  );
  return response.data;
};
