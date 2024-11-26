import API_ENDPOINTS from "@/services/product/api-path";
import request from "@/services/interceptor";

export const createProduct = async (body: REQUEST.TCreateProduct) => {
  const response = await request<TResponse>(API_ENDPOINTS.CREATE_PRODUCT, {
    method: "POST",
    data: body,
  });
  return response.data;
};
