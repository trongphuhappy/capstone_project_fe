import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import useUpdateProfile from "@/app/(user)/profile/hooks/useUpdateProfile";
import { Input } from "@/components/ui/input"; // Ensure Input is imported
import { useEffect } from "react";
import { useAppSelector } from "@/stores/store";

interface UpdateProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateProfileDialog({
  open,
  onClose,
}: UpdateProfileDialogProps) {
  const userState = useAppSelector((state) => state.userSlice);

  const { register, errors, handleSubmit, onSubmit } = useUpdateProfile({
    id: userState.profile?.id || 0,
    email: userState.profile?.email || "",
    fullName: userState.profile?.fullName || "",
    phoneNumber: userState.profile?.phoneNumber || "",
    address: userState.profile?.address || "",
    detailedAddress: userState.profile?.detailedAddress || "",
    dob: userState.profile?.dob || "",
    avatar: userState.profile?.avatar || "",
    role: userState.profile?.role || "",
    citizenId: userState.profile?.citizenId || "",
    citizenCardFront: userState.profile?.citizenCardFront || "",
    citizenCardBack: userState.profile?.citizenCardBack || "",
    updatedAt: userState.profile?.updatedAt || "",
  });

  const handleSubmitData = () => {
    try {
      // onSubmit();
      console.log(1);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userState.profile);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[1000px] px-3 pt-2 pb-7 my-0 overflow-y-auto">
        <div
          className="ml-auto mr-0 group cursor-pointer absolute right-2 top-3"
          onClick={onClose}
        >
          <X
            strokeWidth={2.75}
            className="w-5 h-5 text-slate-400 group-hover:text-black"
          />
        </div>
        <div className="mt-4 w-full justify-between gap-x-5">
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="py-3 px-4">
              <div className="flex flex-col gap-y-5">
                <h2 className="text-2xl">Update profile</h2>
                <div className="basis-1/2 flex flex-col gap-y-2">
                  <label className="text-[15px] font-medium text-gray-400">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    className={`border bg-[#f2f4f7] focus-visible:ring-0 focus-visible:none ${
                      errors?.fullName ? "border-red-500" : ""
                    }`}
                    autoComplete="off"
                    placeholder="e.g. Hehe"
                    {...register("fullName")}
                  />
                  {errors?.fullName && (
                    <p className="text-base text-red-400">
                      {errors?.fullName.message}
                    </p>
                  )}
                </div>
                {/* Phone number */}
                <div className="basis-1/2 flex flex-col gap-y-2">
                  <label className="text-[15px] font-medium text-gray-400">
                    Phone number
                  </label>
                  <div className="flex gap-x-3">
                    <div className="basis-1/12 p-1 border bg-[#f2f4f7] rounded-md text-center">
                      <span className="text-xs text-center text-gray-400">
                        +84
                      </span>
                    </div>
                    <div className="flex-1">
                      <Input
                        type="tel" // Use tel for phone numbers
                        className={`border bg-[#f2f4f7] focus-visible:ring-0 focus-visible:none ${
                          errors?.phoneNumber ? "border-red-500" : ""
                        }`}
                        autoComplete="off"
                        placeholder="e.g. 1234567890"
                        {...register("phoneNumber")}
                      />
                    </div>
                  </div>
                  {errors?.phoneNumber && (
                    <p className="text-base text-red-400">
                      {errors?.phoneNumber?.message}
                    </p>
                  )}
                </div>
                {/* Address */}
                <div className="basis-1/2 flex flex-col gap-y-2">
                  <label className="text-[15px] font-medium text-gray-400">
                    Address
                  </label>
                  <div className="flex gap-x-3">
                    <div className="flex-1">
                      <Input
                        type="text"
                        className={`border bg-[#f2f4f7] focus-visible:ring-0 focus-visible:none ${
                          errors?.address ? "border-red-500" : ""
                        }`}
                        autoComplete="off"
                        placeholder="e.g. 1234567890"
                        {...register("address")}
                      />
                    </div>
                  </div>
                  {errors?.address && (
                    <p className="text-base text-red-400">
                      {errors?.address?.message}
                    </p>
                  )}
                </div>
                {/* Detail Address */}
                <div className="basis-1/2 flex flex-col gap-y-2">
                  <label className="text-[15px] font-medium text-gray-400">
                    Detail Address
                  </label>
                  <div className="flex gap-x-3">
                    <div className="flex-1">
                      <Input
                        type="text"
                        className={`border bg-[#f2f4f7] focus-visible:ring-0 focus-visible:none ${
                          errors?.detailedAddress ? "border-red-500" : ""
                        }`}
                        autoComplete="off"
                        placeholder="e.g. 1234567890"
                        {...register("detailedAddress")}
                      />
                    </div>
                  </div>
                  {errors?.detailedAddress && (
                    <p className="text-base text-red-400">
                      {errors?.detailedAddress?.message}
                    </p>
                  )}
                </div>
                {/* Dob */}
                <div className="basis-1/2 flex flex-col gap-y-2">
                  <label className="text-[15px] font-medium text-gray-400">
                    Date of birth
                  </label>
                  <div className="flex gap-x-3">
                    <div className="flex-1">
                      <Input
                        type="date"
                        className={`border bg-[#f2f4f7] focus-visible:ring-0 focus-visible:none ${
                          errors?.dob ? "border-red-500" : ""
                        }`}
                        autoComplete="off"
                        placeholder="e.g. 1234567890"
                        {...register("dob")}
                      />
                    </div>
                  </div>
                  {errors?.dob && (
                    <p className="text-base text-red-400">
                      {errors?.dob?.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className={`mt-2 block w-[100%] rounded-md py-2 ${
                  Object.keys(errors).length === 0
                    ? "bg-[#7a3cdd]"
                    : "bg-[#C3B1E1]"
                }`}
              >
                <span className="text-base text-gray-200">Update</span>
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
