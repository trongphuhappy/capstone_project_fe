import API_ENDPOINTS from "@/services/product/api-path";
import request from "@/services/interceptor";

export const createProduct = async (data: FormData) => {
  const response = await request<TResponse>(API_ENDPOINTS.CREATE_PRODUCT,  {
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
