"use client";

import {
  RegisterBody,
  RegisterBodyType,
} from "@/utils/schema-validations/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useServiceRegister } from "@/services/auth/services";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";

export function useRegisterForm() {
  const router = useRouter();
  const [typePassword, setTypePassword] = useState<boolean>(false);
  const [typeConfirmPassword, setTypeConfirmPassword] =
    useState<boolean>(false);
  const { mutate, isPending } = useServiceRegister();
  const { addToast } = useToast();

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "1",
    },
  });

  const onSubmit = async (data: RegisterBodyType) => {
    try {
      mutate(data, {
        onSuccess: async (data) => {
          if (data) {
            if (data.value.code === "auth_register_success") {
              reset();
              addToast({
                description: data.value.message,
                type: "success",
                duration: 5000,
              });
              router.push("/login");
            }
          }
        },
        onError: (error) => {
          if (error.errorCode == "auth_email_exists") {
            setError("email", {
              type: "manual",
              message: error.detail,
            });
          }
        },
      });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const valuePassword = watch("password");
  const valueConfirmPassword = watch("confirmPassword");

  const handleToggleTypePassword = () => {
    setTypePassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setTypeConfirmPassword((prev) => !prev);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    control,
    isPending,
    valuePassword,
    typePassword,
    valueConfirmPassword,
    typeConfirmPassword,
    handleToggleTypePassword,
    handleToggleConfirmPassword,
  };
}
