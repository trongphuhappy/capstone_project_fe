import { Eye, EyeOff } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputAuthProps {
  id: string;
  type: "text" | "password" | "number";
  autoComplete: "on" | "off";
  label: string;
  register?: any;
  error?: string;
  value?: string;
  onClickEyePassword?: any;
}

export default function InputAuth({
  id,
  label,
  type,
  autoComplete,
  register,
  error,
  value,
  onClickEyePassword,
}: InputAuthProps) {
  return (
    <>
      <div className="flex justify-between">
        <label htmlFor={id} className="text-gray-600 mt-2 font-montserrat">
          {label}
        </label>
      </div>
      <div
        className={`font-montserrat relative flex p-2 border-2 border-gray-300 rounded-md focus-visible::border-gray-600 ${
          error && "border-red-500"
        }`}
      >
        <input
          id={id}
          type={type}
          autoComplete={autoComplete ?? "off"}
          className={`border-none outline-none w-full bg-transparent font-montserrat`}
          {...register}
        />
        {value !== "" && (id === "password" || id === "confirmpassword") && (
          <div className="absolute select-none top-[50%] -translate-y-[50%] right-[3%]">
            <span
              onClick={onClickEyePassword}
              className="label-auth hover:text-gray-700 cursor-pointer"
            >
              {type === "password" ? <EyeOff /> : <Eye />}
            </span>
          </div>
        )}
      </div>
      {id !== "phonenumber" && error && (
        <p className="text-base text-red-400 font-montserrat">{error}</p>
      )}
    </>
  );
}
