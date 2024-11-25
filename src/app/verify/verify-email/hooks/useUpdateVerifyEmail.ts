"use client";
import { useServiceUpdateVerifyEmail } from "@/services/member/services";

export default function useUpdateVerifyEmail() {
  const { mutate, isPending } = useServiceUpdateVerifyEmail();

  const updateVerifyEmail = (body: REQUEST.TUpdateVerifyEmail) => {
    try {
      mutate(body);
    } catch (err) {
      console.log(err);
    }
  };

  return { isPending, updateVerifyEmail };
}
