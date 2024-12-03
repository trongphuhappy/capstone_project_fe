"use client";

import { useState } from "react";
import useToast from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { setStorageItem } from "@/utils/local-storage";
import { loginUser } from "@/stores/user-slice";
import { useAppDispatch } from "@/stores/store";
import { isTMeta } from "@/utils/compare";
import { loginGoogle } from "@/services/auth/api-services";
import { closeBackdrop, openBackdrop } from "@/stores/state-slice";

export default function useLoginGoogle() {
  const dispatch = useAppDispatch();
  const [isPendingGoogle, setIsPendingGoogle] = useState<boolean>(false);
  const { addToast } = useToast();
  const router = useRouter();

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(openBackdrop());
      try {
        const res = await loginGoogle({
          accessTokenGoogle: tokenResponse?.access_token,
        });
        const { authProfile, token } = res;
        // Save access token in local storage
        setStorageItem(
          "accessToken",
          `${token.tokenType} ${token.accessToken}`
        );
        // Save auth profile in redux storage
        dispatch(loginUser(authProfile));
        router.push("/");
      } catch (error: unknown) {
        if (isTMeta(error)) {
          if (error?.errorCode?.includes("auth_noti")) {
            addToast({
              description: error?.detail,
              type: "error",
              duration: 5000,
            });
          }
          if (error?.errorCode?.includes("auth_regis_another")) {
            addToast({
              description: error?.detail,
              type: "error",
              duration: 5000,
            });
          }
        }
      } finally {
        setIsPendingGoogle(false);
        dispatch(closeBackdrop());
      }
    },
    onError: () => {
      setIsPendingGoogle(false);
      dispatch(closeBackdrop());
      console.error("Google login failed");
    },
  });

  return { handleLoginGoogle, isPendingGoogle };
}
