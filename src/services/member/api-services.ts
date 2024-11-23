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

