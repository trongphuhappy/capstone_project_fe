import { TMeta, TMetaWrapper } from "@/typings";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/utils/schema-validations/auth.schema";
import { useMutation } from "@tanstack/react-query";
import {
  getCurrentAuthInfo,
  login,
  register,
} from "@/services/auth/api-services";
import { setStorageItem } from "@/utils/local-storage";
import { useAppDispatch } from "@/stores/store";
import { addProfile } from "@/stores/userSlice";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";

export const useServiceLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation<TMetaWrapper<API.TAuthResponse>, TMeta, LoginBodyType>({
    mutationFn: login,
    onSuccess: async (data) => {
      try {
        setStorageItem("accessToken", `${data.result.data.accessToken}`);
        const response = await getCurrentAuthInfo();
        dispatch(addProfile(response.result.data));
        router.push("/");
      } catch (err) {
        console.log(err);
      }
      return data;
    },
  });
};

export const useServiceRegister = () => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const router = useRouter();
  return useMutation<TMetaWrapper<API.TAuthResponse>, TMeta, RegisterBodyType>({
    mutationFn: register,
    onSuccess: async (data) => {
      try {
        setStorageItem("accessToken", `${data.result.data.accessToken}`);
        const response = await getCurrentAuthInfo();
        dispatch(addProfile(response.result.data));
        router.push("/");
      } catch (err) {
        console.log(err);
      }

      return data;
    },
    onError: (err) => {
      addToast({
        type: "error",
        description: "Register failed",
        duration: 3000,
      });
      return err;
    },
  });
};
