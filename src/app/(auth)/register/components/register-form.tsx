"use client";

import { Backdrop } from "@/components/backdrop";
import InputAuth from "@/components/input-auth";
import Link from "next/link";
import { useRegisterForm } from "@/app/(auth)/register/hooks/useRegisterForm";

export default function RegisterForm() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    valuePassword,
    valueConfirmPassword,
    typePassword,
    typeConfirmPassword,
    isPending,
    handleToggleTypePassword,
    handleToggleConfirmPassword,
  } = useRegisterForm();

  return (
    <div>
      <div className="w-[70%] px-5 py-4 m-auto">
        <h2 className="text-[1.5rem] leading-8 font-medium font-montserrat">
          Sign up
        </h2>
        <span className="text-gray-500 inline-block mt-2 font-montserrat">
          Creating beautiful spaces without the hassle of ownership – rent your
          dream furniture today!
        </span>
        <form
          className="pt-5 flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="text"
              label="Full name"
              type="text"
              autoComplete="off"
              register={register("fullName")}
              error={errors?.fullName?.message}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="username"
              label="User name"
              type="text"
              autoComplete="off"
              register={register("userName")}
              error={errors?.userName?.message}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="password"
              label="Password"
              type={typePassword === false ? "password" : "text"}
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
              label="Confirm password"
              type={typeConfirmPassword === false ? "password" : "text"}
              autoComplete="off"
              register={register("passwordConfirm")}
              error={errors?.passwordConfirm?.message}
              value={valueConfirmPassword}
              onClickEyePassword={handleToggleConfirmPassword}
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <button
              className={`mt-2 block w-[100%] rounded-md py-2 ${
                Object.keys(errors).length === 0
                  ? "bg-[#7a3cdd]"
                  : "bg-[#C3B1E1]"
              }`}
            >
              <span className="text-base text-gray-200 font-montserrat">
                Sign Up
              </span>
            </button>
            <div className="flex items-center justify-between gap-3">
              <div
                className={`w-[50%] h-1 rounded-full ${
                  Object.keys(errors).length === 0
                    ? "bg-[#7a3cdd]"
                    : "bg-[#C3B1E1]"
                }`}
              ></div>
              <span className="text-gray-400">OR</span>
              <div
                className={`w-[50%] h-1 rounded-full ${
                  Object.keys(errors).length === 0
                    ? "bg-[#7a3cdd]"
                    : "bg-[#C3B1E1]"
                }`}
              ></div>
            </div>
            <button
              type="button"
              // onClick={() => handleLoginGoogle()}
              className={`block w-[100%] rounded-md py-2 bg-white border border-gray-400 hover:bg-gray-300`}
            >
              <div className="relative">
                <figure className="absolute top-1/2 -translate-y-1/2 left-[38%]">
                  <img
                    src={"/images/Google-icon.svg"}
                    alt="Login with Google"
                    width={25}
                    height={25}
                    className="block"
                  />
                </figure>
                <span className="text-base text-gray-700">Google</span>
              </div>
            </button>
            <div className="flex justify-between font-montserrat">
              <p className="text-[1rem]">
                Have an account Neighbor?{" "}
                <Link href="/login">
                  <span className="font-bold cursor-pointer">Log In</span>
                </Link>
              </p>
              <Link href="/forgot-password">
                <p className="text-[1rem]">
                  <span className="font-bold cursor-pointer">
                    Forgot password?
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Backdrop open={isPending} />
    </div>
  );
}
