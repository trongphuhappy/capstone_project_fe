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

export const getAllOrders = async ({
  accountLessorId = null,
  accountUserId = null,
  pageIndex = null,
  pageSize = null,
  isConflict = null,
  orderStatus = null,
  orderReportStatus = null,
}: REQUEST.TGetAllOrders) => {
  const params: Record<string, any> = {};
  if (accountLessorId) params.accountLessorId = accountLessorId;
  if (accountUserId) params.accountUserId = accountUserId;
  if (pageIndex) params.pageIndex = pageIndex;
  if (pageSize) params.pageSize = pageSize;
  if (isConflict != null) params.isConflict = isConflict;
  if (orderStatus) params.orderStatus = orderStatus;
  if (orderReportStatus) params.orderReportStatus = orderReportStatus;
  params.SortType = 1; params.IsSortASC = false;
  const response = await request<TResponseData<API.TGetAllOrders>>(
    API_ENDPOINTS.GET_ALL_ORDERS,
    {
      method: "GET",
      params: Object.keys(params).length > 0 ? params : undefined,
    }
  );
  return response.data;
};

export const userConfirmOrder = async ({
  orderId,
  isApproved,
  rejectReason,
}: REQUEST.TConfirmOrder) => {
  const response = await request<TResponse>(API_ENDPOINTS.USER_CONFIRM_ORDER, {
    method: "PUT",
    data: {
      orderId: orderId,
      isApproved: isApproved,
      rejectReason: rejectReason,
    },
  });
  return response.data;
};

export const lessorConfirmOrder = async ({
  orderId,
  isApproved,
  rejectReason,
}: REQUEST.TConfirmOrder) => {
  const response = await request<TResponse>(
    API_ENDPOINTS.LESSOR_CONFIRM_ORDER,
    {
      method: "PUT",
      data: {
        orderId: orderId,
        isApproved: isApproved,
        rejectReason: rejectReason,
      },
    }
  );
  return response.data;
};

export const userReportOrder = async ({
  orderId,
  userReport,
}: REQUEST.TReportOrder) => {
  const response = await request<TResponse>(API_ENDPOINTS.USER_REPORT_ORDER, {
    method: "PUT",
    data: {
      orderId: orderId,
      userReport: userReport,
    },
  });
  return response.data;
};

export const adminConfirmOrder = async ({
  orderId,
  isApproved,
  rejectReason,
}: REQUEST.TConfirmOrder) => {
  const response = await request<TResponse>(API_ENDPOINTS.ADMIN_CONFIRM_ORDER, {
    method: "PUT",
    data: {
      orderId: orderId,
      isApproved: isApproved,
      rejectReason: rejectReason,
    },
  });
  return response.data;
};
