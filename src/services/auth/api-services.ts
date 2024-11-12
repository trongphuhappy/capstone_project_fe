import { LoginBodyType, RegisterBodyType } from "@/utils/schema-validations/auth.schema";
import API_ENDPOINTS from "@/services/auth/api-path";
import request from "@/services/interceptor";
import { TMetaWrapper } from "@/typings";

export const login = async (body: LoginBodyType) => {
  const response = await request<TMetaWrapper<API.TAuthResponse>>(
    API_ENDPOINTS.LOGIN,
    {
      method: "POST",
      data: body,
    }
  );
  return response.data;
};

export const register = async (body: RegisterBodyType) => {
  const response = await request<TMetaWrapper<API.TAuthResponse>>(API_ENDPOINTS.REGISTER, {
    method: "POST",
    data: body,
  });
  return response.data;
};

export const getCurrentAuthInfo = async () => {
  const response = await request<TMetaWrapper<API.TAuthProfile>>(
    API_ENDPOINTS.PROFILE,
    {
      method: "GET",
      timeout: 55000,
    }
  );
  return response.data;
};

// export const adminLogin = async (body: TLoginFormFields) => {
//   return request<API.TAuthResponse>(API_ENDPOINTS.ADMIN_LOGIN, {
//     method: "POST",
//     data: body,
//   });
// };
