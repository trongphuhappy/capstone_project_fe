import { useServiceForgotPasswordOtp } from "@/services/auth/services";
import {
  setForgotPasswordOtp,
} from "@/stores/auth-slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useState } from "react";

const useForgotPasswordOtp = () => {
  const dispatch = useAppDispatch();
  const forgotPasswordState = useAppSelector(
    (state) => state.authSlice.forgotPassword
  );
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const { mutate, isPending } = useServiceForgotPasswordOtp();

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleReset = () => {
    setValue("");
    setError("");
  };

  const handleSubmitVerifyOtp = (otp: string) => {
    dispatch(
      setForgotPasswordOtp({
        otp: otp,
        email: forgotPasswordState.email,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length < 5) return setError("Please fill in completely");
    else {
      setError("");
      const data = {
        email: forgotPasswordState.email,
        otp: value,
      };
      mutate(data, {
        onSuccess: async (data) => {
          if (data) {
            console.log(data);
            handleSubmitVerifyOtp(`${data.value.data}`);
            handleReset();
          }
        },
        onError: (error) => {
          if (error.errorCode.includes("auth_otp")) {
            setError(error.detail);
          }
        },
      });
    }
  };

  return {
    error,
    value,
    handleChange,
    handleSubmit,
    setError,
    isPending,
  };
};

export default useForgotPasswordOtp;
