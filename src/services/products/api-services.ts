import request from "@/services/interceptor";
import API_ENDPOINTS from "@/services/products/api-path";
import { IPaginationResponse, TMetaWrapper } from "@/typings";

export const getProducts = async (pagination: API.IProductPaginationParams) => {
  const response = await request<
    TMetaWrapper<IPaginationResponse<API.IProductCard>>
  >(API_ENDPOINTS.PRODUCTS, {
    timeout: 15000,
    params: {
      ...pagination,
      take: pagination.take ?? 12,
    },
  });
  return response.data;
};

export const getProductDetails = async (productId?: number | string) => {
  const url = API_ENDPOINTS.PRODUCT_DETAILS.replace(
    ":productId",
    `${productId}`
  );
  const response = await request<TMetaWrapper<API.IProductDetails>>(url, {
    method: "GET",
    timeout: 15000,
  });
  return response.data;
};
