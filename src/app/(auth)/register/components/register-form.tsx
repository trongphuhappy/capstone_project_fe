"use client";

import { Backdrop } from "@/components/backdrop";
import InputAuth from "@/components/input-auth";
import Link from "next/link";
import { useRegisterForm } from "@/app/(auth)/register/hooks/useRegisterForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Genders } from "@/const/authentication";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { RegisterBodyType } from "@/utils/schema-validations/auth.schema";

export default function RegisterForm() {
  const [gender, setGender] = useState<string>(Genders[0].value);

  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    valuePassword,
    valueConfirmPassword,
    typePassword,
    typeConfirmPassword,
    handleToggleTypePassword,
    handleToggleConfirmPassword,
  } = useRegisterForm();

  const handleSubmitForm = (data: RegisterBodyType) => {
    const request: REQUEST.TRegister = {
      ...data,
      gender: Genders[0].value === gender ? Genders[0].id : Genders[1].id,
    };
    onSubmit(request);
  };

  return (
    <div className="w-full max-w-[680px] px-4 py-5 mx-auto font-montserrat">
      <h2 className="text-2xl font-medium leading-8">Sign up</h2>
      <span className="text-gray-500 inline-block mt-2">
        Creating beautiful spaces without the hassle of ownership – rent your
        dream furniture today!
      </span>
      <form
        className="pt-4 flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="flex flex-col md:flex-row md:gap-x-4">
          <div className="w-full md:w-1/2 flex flex-col gap-y-2">
            <InputAuth
              id="firstname"
              label="First Name"
              type="text"
              autoComplete="off"
              register={register("firstName")}
              error={errors?.firstName?.message}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-y-2">
            <InputAuth
              id="lastname"
              label="Last Name"
              type="text"
              autoComplete="off"
              register={register("lastName")}
              error={errors?.lastName?.message}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="gender" className="text-gray-600">
            Gender
          </label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="p-2 border-2 border-gray-300 rounded-md">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              {Genders.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <InputAuth
            id="email"
            label="Email"
            type="text"
            autoComplete="off"
            register={register("email")}
            error={errors?.email?.message}
          />
        </div>
        <div className="flex flex-col md:flex-row md:gap-x-4">
          <div className="flex flex-col gap-y-2 mt-2">
            <label htmlFor="code" className="text-gray-600">
              Code
            </label>
            <div
              className={`block p-2 border-2 border-gray-300 rounded-md text-center ${errors?.phoneNumber?.message && "border-red-500"
                }`}
            >
              +84
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-y-2">
            <InputAuth
              id="phonenumber"
              label="Phone Number"
              type="number"
              autoComplete="off"
              register={register("phoneNumber")}
              error={errors?.phoneNumber?.message}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <InputAuth
            id="password"
            label="Password"
            type={typePassword ? "text" : "password"}
            autoComplete="off"
            register={register("password")}
            error={errors?.password?.message}
            value={valuePassword}
            onClickEyePassword={handleToggleTypePassword}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <InputAuth
            id="confirmpassword"
            label="Confirm Password"
            type={typeConfirmPassword ? "text" : "password"}
            autoComplete="off"
            register={register("confirmPassword")}
            error={errors?.confirmPassword?.message}
            value={valueConfirmPassword}
            onClickEyePassword={handleToggleConfirmPassword}
          />
        </div>
        <button
          className={`mt-2 block w-full rounded-md py-2 ${Object.keys(errors).length === 0 ? "bg-[#7a3cdd]" : "bg-[#C3B1E1]"
            }`}
        >
          <span className="text-base text-gray-200">Sign Up</span>
        </button>
        <div className="flex items-center justify-between gap-3">
          <div
            className={`w-[50%] h-1 rounded-full ${Object.keys(errors).length === 0 ? "bg-[#7a3cdd]" : "bg-[#C3B1E1]"
              }`}
          ></div>
          <span className="text-gray-400">OR</span>
          <div
            className={`w-[50%] h-1 rounded-full ${Object.keys(errors).length === 0 ? "bg-[#7a3cdd]" : "bg-[#C3B1E1]"
              }`}
          ></div>
        </div>
        <button
          type="button"
          className="w-full rounded-md py-2 bg-white border border-gray-400 hover:bg-gray-300 flex items-center justify-center space-x-2"
        >
          <img
            src={"/images/Google-icon.svg"}
            alt="Login with Google"
            width={25}
            height={25}
            className="block"
          />
          <span className="text-base text-gray-700">Google</span>
        </button>
        <div className="flex flex-wrap justify-between gap-y-2">
          <p className="text-[1rem]">
            Have an account Neighbor?{" "}
            <Link href="/login">
              <span className="font-bold cursor-pointer">Log In</span>
            </Link>
          </p>
          <Link href="/forgot-password">
            <p className="text-[1rem]">
              <span className="font-bold cursor-pointer">Forgot password?</span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}
