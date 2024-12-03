import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import useForgotPasswordOtp from "@/app/(auth)/forgot-password/hooks/useForgotPasswordOtp";
import { Backdrop } from "@/components/backdrop";

export default function ForgotPasswordOtp() {
  const { error, value, handleChange, handleSubmit, isPending } =
    useForgotPasswordOtp();

  const renderListOtp = () => {
    return (
      <InputOTP maxLength={5} value={value} onChange={handleChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={4} />
        </InputOTPGroup>
      </InputOTP>
    );
  };

  return (
    <div className="font-montserrat">
      <h2 className="text-[1.5rem] leading-8 font-medium">Forgot Password</h2>
      <span className="text-gray-500 inline-block mt-2">
        The OTP has been sent, please enter it to complete!
      </span>
      <form className="pt-5 flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-4">{renderListOtp()}</div>
          {error && <p className="text-base text-red-400">{error}</p>}
        </div>
        <div className="flex flex-col gap-y-5">
          <button
            type="submit"
            className={`mt-2 block w-[100%] rounded-md py-2 ${
              value !== "" ? "bg-[#7a3cdd]" : "bg-[#C3B1E1]"
            }`}
          >
            <span className="text-base text-gray-200">Submit</span>
          </button>
          <div className="flex items-center justify-between gap-3">
            <div
              className={`w-[50%] h-1 rounded-full ${
                value !== "" ? "bg-[#7a3cdd]" : "bg-[#C3B1E1]"
              }`}
            ></div>
            <span className="text-gray-400">OR</span>
            <div
              className={`w-[50%] h-1 rounded-full ${
                value !== "" ? "bg-[#7a3cdd]" : "bg-[#C3B1E1]"
              }`}
            ></div>
          </div>
          <div className="flex justify-between">
            <p className="text-[1rem]">
              Have an account at PawFund?{" "}
              <Link href="/login">
                <span className="font-bold cursor-pointer">Log In</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
      <Backdrop open={isPending} />
    </div>
  );
}
