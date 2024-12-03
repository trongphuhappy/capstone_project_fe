import { useServiceForgotPasswordEmail } from "@/services/auth/services";
import { setForgotPasswordEmail } from "@/stores/auth-slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  ForgotPasswordEmailBody,
  ForgotPasswordEmailBodyType,
} from "@/utils/schema-validations/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useForgotPasswordEmail() {
  const dispatch = useAppDispatch();
  const forgotPasswordState = useAppSelector(
    (state) => state.authSlice.forgotPassword
  );
  const { mutate, isPending } = useServiceForgotPasswordEmail();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordEmailBodyType>({
    resolver: zodResolver(ForgotPasswordEmailBody),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitFormEmail = (email: string) => {
    dispatch(
      setForgotPasswordEmail({
        email: email,
        otp: forgotPasswordState.otp,
      })
    );
  };

  const onSubmit = (data: ForgotPasswordEmailBodyType) => {
    try {
      mutate(data, {
        onSuccess: async (data) => {
          handleSubmitFormEmail(`${data.value.data}`);
          reset();
        },
        onError: (error) => {
          if (error.errorCode.includes("auth_email")) {
            setError("email", {
              type: "manual",
              message: error.detail,
            });
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
  };
}
