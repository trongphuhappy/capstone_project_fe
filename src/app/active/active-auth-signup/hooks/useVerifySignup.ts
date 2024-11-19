"use client";
import { useServiceVerifyEmail } from "@/services/auth/services";

export default function useVerifySignup() {
  const { mutate, isPending } = useServiceVerifyEmail();

  const verifySignup = (body: REQUEST.TAuthVerifyEmail) => {
    try {
      mutate(body);
    } catch (err) {
      console.log(err);
    }
  };

  return { isPending, verifySignup };
}
