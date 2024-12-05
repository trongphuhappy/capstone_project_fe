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

export const getProfileById = async ({
  accountId,
}: REQUEST.TGetProfileById) => {
  const response = await request<TResponseData<API.TProfile>>(
    API_ENDPOINTS.GET_PROFILE_BY_ID,
    {
      method: "GET",
      params: {
        accountId: accountId,
      },
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

export const getInfoLessor = async ({
  publicLessor = true,
}: REQUEST.TGetInfoLessor) => {
  const response = await request<TResponseData<API.TInfoLessor>>(
    API_ENDPOINTS.GET_INFO_LESSOR,
    {
      method: "GET",
      params: {
        publicLessor,
      },
    }
  );
  return response.data;
};

export const getInfoLessorById = async ({
  accountId,
}: REQUEST.TGetInfoLessorById) => {
  const response = await request<TResponseData<API.TInfoLessor>>(
    API_ENDPOINTS.GET_INFO_LESSOR_BY_ID,
    {
      method: "GET",
      params: {
        accountId: accountId,
      },
    }
  );
  return response.data;
};

export const checkLessorExistLessorByAccountId = async () => {
  const response = await request<TResponseData<Boolean>>(
    API_ENDPOINTS.CHECK_LESSOR_EXIST,
    {
      method: "GET",
    }
  );
  return response.data;
};

export const updateInfoLessor = async (data: REQUEST.TUpdateLessorInfo) => {
  const response = await request<TResponse>(API_ENDPOINTS.UPDATE_INFO_LESSOR, {
    method: "PUT",
    data,
  });
  return response.data;
};
