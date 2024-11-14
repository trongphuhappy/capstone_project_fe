import request from "@/services/interceptor";
import API_ENDPOINTS from "@/services/user/api-path";
import { UpdateProfileBodyType } from "@/utils/schema-validations/user.schema";

export const patchUser = async (body: UpdateProfileBodyType) => {
  return request<API.TAuthResponse>(API_ENDPOINTS.USER_UPDATE, {
    method: "PATCH",
    data: {
      body,
    },
  });
};
