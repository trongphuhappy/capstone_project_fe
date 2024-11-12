"use client";

import {
  RegisterBody,
  RegisterBodyType,
} from "@/utils/schema-validations/auth.schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceRegister } from "@/services/auth/services";

export function useRegisterForm() {
  const [typePassword, setTypePassword] = useState<boolean>(false);
  const [typeConfirmPassword, setTypeConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      userName: "",
      fullName: "",
      password: "",
      passwordConfirm: "",
      email: "",
    },
  });

  const { mutate, isPending } = useServiceRegister();
  const onSubmit = async (request: RegisterBodyType) => {
    try {
      mutate(request);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const valuePassword = watch("password");
  const valueConfirmPassword = watch("passwordConfirm");

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
    valuePassword,
    typePassword,
    typeConfirmPassword,
    valueConfirmPassword,
    handleToggleTypePassword,
    handleToggleConfirmPassword,
    isPending,
  };
}
