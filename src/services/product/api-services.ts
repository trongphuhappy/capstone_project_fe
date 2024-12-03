import API_ENDPOINTS from "@/services/product/api-path";
import request from "@/services/interceptor";

export const createProduct = async (data: FormData) => {
  const response = await request<TResponse>(API_ENDPOINTS.CREATE_PRODUCT, {
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const confirmProduct = async (data: REQUEST.TConfirmProduct) => {
  const response = await request<TResponse>(API_ENDPOINTS.CONFIRM_PRODUCT, {
    method: "PUT",
    data,
  });
  return response.data;
};

export const getProducts = async ({
  id = null,
  name = null,
  statusType = null,
  policies = null,
  description = null,
  rating = null,
  value = null,
  maximumRentDays = null,
  categoryId = null,
  confirmStatus = null,
  accountUserId = null,
  accountLessorId = null,
  pageIndex = null,
  pageSize = null,
  isVehicle = null,
}: REQUEST.TGetProductsFilter) => {
  const params: Record<string, any> = {};
  if (id) params.id = id;
  if (name) params.name = name;
  if (statusType) params.statusType = statusType;
  if (policies) params.policies = policies;
  if (description) params.description = description;
  if (rating) params.rating = rating;
  if (value) params.value = value;
  if (maximumRentDays) params.maximumRentDays = maximumRentDays;
  if (categoryId) params.categoryId = categoryId;
  if (confirmStatus) params.confirmStatus = confirmStatus;
  if (accountUserId) params.accountUserId = accountUserId;
  if (accountLessorId) params.accountLessorId = accountLessorId;
  if (pageIndex) params.pageIndex = pageIndex;
  if (pageSize) params.pageSize = pageSize;
  if (isVehicle != null) params.isVehicle = isVehicle;

  const response = await request<TResponseData<API.TGetProducts>>(
    API_ENDPOINTS.GET_PRODUCTS,
    {
      method: "GET",
      params: Object.keys(params).length > 0 ? params : undefined,
    }
  );
  return response.data;
};

export const getProductById = async ({
  Id,
  AccountId = null,
}: REQUEST.TGetProductById) => {
  const params: Record<string, any> = {};
  if (Id) params.Id = Id;
  if (AccountId) params.AccountId = AccountId;

  const response = await request<TResponseData<API.TProduct>>(
    API_ENDPOINTS.GET_PRODUCT_BY_ID,
    {
      method: "GET",
      params: Object.keys(params).length > 0 ? params : undefined,
    }
  );
  return response.data;
};

export const addToWishList = async ({ productId }: REQUEST.TAddToWishlist) => {
  const response = await request<TResponse>(API_ENDPOINTS.ADD_TO_WISHLIST, {
    method: "PUT",
    params: {
      ProductId: productId,
    },
  });
  return response.data;
};
