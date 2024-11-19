import {
  LoginBodyType,
  RegisterBodyType,
} from "@/utils/schema-validations/auth.schema";
import API_ENDPOINTS from "@/services/auth/api-path";
import request from "@/services/interceptor";

export const login = async (body: LoginBodyType) => {
  const response = await request<API.TAuthResponse>(API_ENDPOINTS.LOGIN, {
    method: "POST",
    data: body,
  });
  return response.data;
};

export const register = async (body: REQUEST.TRegister) => {
  const response = await request<TResponse>(API_ENDPOINTS.REGISTER, {
    method: "POST",
    data: body,
  });
  return response.data;
};

export const logout = async () => {
  const response = await request<TResponseData>(API_ENDPOINTS.LOGOUT, {
    method: "POST",
  });
  return response.data;
};

export const refreshToken = async () => {
  const response = await request<API.TAuthResponse>(
    API_ENDPOINTS.REFRESH_TOKEN,
    {
      method: "GET",
    }
  );
  return response.data;
};

export const verifyEmail = async (body: REQUEST.TAuthVerifyEmail) => {
  const response = await request<TResponse>(API_ENDPOINTS.VERIFY_EMAIL, {
    method: "POST",
    data: body,
  });
  return response.data;
};