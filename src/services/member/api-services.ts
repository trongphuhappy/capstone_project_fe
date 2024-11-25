import API_ENDPOINTS from "@/services/member/api-path";
import request from "@/services/interceptor";

export const getProfile = async () => {
  const response = await request<TResponseData<API.TProfile>>(
    API_ENDPOINTS.GET_PROFILE,
    {
      method: "GET",
    }
  );
  return response.data;
};

export const updateAvatar = async (data: FormData) => {
  const response = await request<TResponseData<API.TImageProfile>>(
    API_ENDPOINTS.UPDATE_AVATAR,
    {
      method: "PUT",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateCoverPhoto = async (data: FormData) => {
  const response = await request<TResponseData<API.TImageProfile>>(
    API_ENDPOINTS.UPDATE_COVER_PHOTO,
    {
      method: "PUT",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateProfile = async (data: REQUEST.TUpdateProfile) => {
  const response = await request<TResponseData<API.TProfile>>(
    API_ENDPOINTS.UPDATE_PROFILE,
    {
      method: "PUT",
      data,
    }
  );
  return response.data;
};

export const updateEmail = async (data: REQUEST.TUpdateEmail) => {
  const response = await request<TResponse>(API_ENDPOINTS.UPDATE_EMAIL, {
    method: "PUT",
    data,
  });
  return response.data;
};

export const updateVerifyEmail = async (data: REQUEST.TUpdateVerifyEmail) => {
  const response = await request<TResponse>(API_ENDPOINTS.VERIFY_UPDATE_EMAIL, {
    method: "PUT",
    params: {
      userId: data.userId,
    },
  });
  return response.data;
};

export const updateCitizen = async (data: FormData) => {
  const response = await request<TResponse>(
    API_ENDPOINTS.UPDATE_CITIZEN,
    {
      method: "PUT",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};