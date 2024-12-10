"use client";

import { useLoginForm } from "@/app/(auth)/login/hooks/useLoginForm";
import { Backdrop } from "@/components/backdrop";
import InputAuth from "@/components/input-auth";
import useLoginGoogle from "@/hooks/use-login-google";
import Link from "next/link";

export default function LoginForm() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    valuePassword,
    typePassword,
    isPending,
    handleToggleTypePassword,
  } = useLoginForm();

  const { handleLoginGoogle, isPendingGoogle } = useLoginGoogle();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white font-montserrat">
      <div className="w-full max-w-max px-5 py-4 m-auto">
        <h2 className="text-[1.5rem] leading-8 font-medium text-center">
          Log In
        </h2>
        <span className="text-gray-500 inline-block mt-2 text-center">
          Creating beautiful spaces without the hassle of ownership – rent your
          dream furniture today!
        </span>
        <form
          className="pt-5 flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="Email"
              label="Email"
              type="text"
              autoComplete="off"
              register={register("email")}
              error={errors?.email?.message}
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
          <div className="flex flex-col gap-y-5">
            <button
              type="submit"
              className={`mt-2 block w-full rounded-md py-2 ${
                Object.keys(errors).length === 0
                  ? "bg-[#7a3cdd]"
                  : "bg-[#C3B1E1]"
              }`}
            >
              <span className="text-base text-gray-200">
                Log In
              </span>
            </button>
            <div className="flex items-center justify-between gap-3">
              <div
                className={`w-[45%] h-1 rounded-full ${
                  Object.keys(errors).length === 0
                    ? "bg-[#7a3cdd]"
                    : "bg-[#C3B1E1]"
                }`}
              ></div>
              <span className="text-gray-400 font-montserrat">OR</span>
              <div
                className={`w-[45%] h-1 rounded-full ${
                  Object.keys(errors).length === 0
                    ? "bg-[#7a3cdd]"
                    : "bg-[#C3B1E1]"
                }`}
              ></div>
            </div>
            <button
              type="button"
              onClick={() => handleLoginGoogle()}
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

            <div className="flex justify-between">
              <p className="text-[1rem]">
                First time using Neighbor?{" "}
                <Link href="/register">
                  <span className="font-bold cursor-pointer">
                    Sign up
                  </span>
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
