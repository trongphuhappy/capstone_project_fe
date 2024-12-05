import request from "@/services/interceptor";
import API_ENDPOINTS from "@/services/feedback/api-path";

export const createFeedback = async (data: REQUEST.TCreateFeedback) => {
  const response = await request<TResponse>(API_ENDPOINTS.CREATE_FEEDBACK, {
    method: "POST",
    data,
  });
  return response.data;
};

export const getFeedbacks = async ({
  accountId = null,
  pageIndex = null,
  pageSize = null,
  productId = null,
}: REQUEST.TGetFeedbacks) => {
  const params: Record<string, any> = {};
  if (pageIndex) params.pageIndex = pageIndex;
  if (pageSize) params.pageSize = pageSize;
  if (accountId) params.accountId = accountId;
  if (productId != null) params.productId = productId;
  const response = await request<TResponseData<API.TGetFeedbacks>>(API_ENDPOINTS.GET_FEEDBACKS, {
    method: "GET",
    params: Object.keys(params).length > 0 ? params : undefined,
  });
  return response.data;
};
