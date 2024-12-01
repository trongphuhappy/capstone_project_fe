import API_ENDPOINTS from "@/services/order/api-path";
import request from "@/services/interceptor";

export const createOrder = async (data: REQUEST.TCreateOder) => {
  const response = await request<TResponseData<API.TCreateOrder>>(
    API_ENDPOINTS.CREATE_ORDER,
    {
      method: "POST",
      data: data,
    }
  );
  return response.data;
};
