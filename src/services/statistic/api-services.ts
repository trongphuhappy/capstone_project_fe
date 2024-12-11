import API_ENDPOINTS from "@/services/statistic/api-path";
import request from "@/services/interceptor";

export const getTotalBoxLessor = async () => {
  const response = await request<TResponseData<API.TBoxLessor[]>>(API_ENDPOINTS.GET_BOX_LESSOR, {
    method: "GET",
  });
  return response.data;
};

export const getCountOrderByLessor = async () => {
  const response = await request<TResponseData<API.TOrderStatistic[]>>(API_ENDPOINTS.GET_COUNT_ORDER_LESSOR, {
    method: "GET",
  });
  return response.data;
};

export const getPercentOrderByLessor = async () => {
  const response = await request<TResponseData<API.TOrderPercent>>(API_ENDPOINTS.GET_PERCENT_ORDER_LESSOR, {
    method: "GET",
  });
  return response.data;
};

