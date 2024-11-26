import request from "@/services/interceptor";
import API_ENDPOINTS from "@/services/surcharge/api-path";

export const getSurcharges = async () => {
  const response = await request<TResponseData<API.TProfile>>(
    API_ENDPOINTS.GET_ALL,
    {
      method: "GET",
    }
  );
  return response.data;
};
