import API_ENDPOINTS from "@/services/dashboard/api-path";
import request from "@/services/interceptor";

export const getDashboard = async ({
    year = null,
  }: REQUEST.TYear) => {
    const params: Record<string, any> = {};
    if (year) params.year = year;
    const response = await request<TResponseData<API.TDashboardData>>(
      API_ENDPOINTS.GET_DASHBOARD,
      {
        method: "GET",
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
    return response.data;
  };