import request from "@/services/interceptor";
import API_ENDPOINTS from "@/services/products/api-path";
import { IPaginationResponse, TMetaWrapper } from "@/typings";

export const getProducts = async (pagination: API.IProductPaginationParams) => {
  const response = await request<TMetaWrapper<IPaginationResponse<API.IProductCard>>>(
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
