"use client";

import {
  LoginBody,
  LoginBodyType,
} from "@/utils/schema-validations/auth.schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceLogin } from "@/services/auth/services";
import useToast from "@/hooks/use-toast";
import { Roles } from "@/const/authentication";
import { useRouter } from "next/navigation";

export function useLoginForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [typePassword, setTypePassword] = useState<boolean>(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useServiceLogin();
  const onSubmit = async (request: LoginBodyType) => {
    try {
      mutate(request, {
        onSuccess: async (data) => {
          reset();
          if (data.authProfile.roleId === Roles[1].id) {
            return router.push("/");
          } else if(data.authProfile.roleId === Roles[0].id) {
            return router.push("/admin/dashboard");
          }
        },
        onError: (error) => {
          if (error.errorCode === "auth_password_not_match") {
            setError("password", {
              type: "manual",
              message: error.detail,
            });
          }
          if (error.errorCode === "auth_not_regist") {
            setError("email", {
              type: "manual",
              message: error.detail,
            });
          }
          if (error.errorCode === "account_banned") {
            addToast({
              type: "error",
              description: error.detail,
              duration: 4000,
            });
          }
          if (error.errorCode === "auth_regis_another") {
            addToast({
              type: "error",
              description: error.detail,
              duration: 4000,
            });
          }
        },
      });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const valuePassword = watch("password");

  const handleToggleTypePassword = () => {
    setTypePassword((prev) => !prev);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    valuePassword,
    typePassword,
    handleToggleTypePassword,
    isPending,
  };
}
