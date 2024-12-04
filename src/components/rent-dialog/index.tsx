import { DatePicker } from "@/app/(user)/create-product/components/date-picker";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useRentNow from "@/hooks/use-rent-now";
import { useAppSelector } from "@/stores/store";
import { X } from "lucide-react";
import { useState } from "react";

interface RentDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function RentDialog({ open, onClose }: RentDialogProps) {
  const { createOrderApi, isPending } = useRentNow();

  const productRentState = useAppSelector((state) => state.rentSlice);

  const [rentTime, setRentTime] = useState<Date | null>(new Date());
  const [returnTime, setReturnTime] = useState<Date | null>(new Date());

  const [rentTimeError, setRentTimeError] = useState<string | null>(null);
  const [returnTimeError, setReturnTimeError] = useState<string | null>(null);

  const handleClose = () => {
    setRentTime(null);
    setRentTime(null);
    setRentTimeError(null);
    setReturnTimeError(null);

    onClose();
  };

  const handleSubmit = async () => {
    if (rentTime && returnTime) {
      const diffTime = returnTime?.getTime() - rentTime?.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
      if (
        productRentState.product &&
        diffDays > productRentState?.product?.maximumRentDays
      ) {
        setReturnTimeError("Rent time must be less than the maximum rent days");
        return;
      }
    }
    const form: REQUEST.TCreateOder = {
      productId: productRentState.product?.id || "",
      rentTime: rentTime?.toISOString() || "",
      returnTime: returnTime?.toISOString() || "",
    };
    handleClose();
    await createOrderApi(form);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[600px] px-3 pt-2 pb-7 my-0 overflow-y-auto font-montserrat">
        <div className="px-2 pt-5">
          <div className="flex justify-end">
            <button
              className="w-8 h-8 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center group"
              onClick={handleClose}
            >
              <i>
                <X
                  strokeWidth={2.75}
                  className="text-gray-500 group-hover:text-gray-950 w-5 h-5"
                />
              </i>
            </button>
          </div>
          <div>
            <div>
              <h3 className="text-xl">
                Rent product{" "}
                <b className="font-semibold">
                  {productRentState.product?.name}
                </b>
              </h3>
              <p className="mt-1">
                Please deposit 30% in advance to rent the product
              </p>
              <p className="mt-1">
                Maximum rent days: {productRentState.product?.maximumRentDays}{" "}
                day
              </p>
            </div>
            <div className="mt-3 flex flex-col gap-y-2 w-full mb-4">
              <label className="text-base font-semibold">
                Rent start time{" "}
              </label>
              <DatePicker
                date={rentTime || new Date()}
                onSelect={setRentTime}
              />
              {rentTimeError && (
                <span className="text-red-500">{rentTimeError}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full mb-4">
              <label className="text-base font-semibold">Rent end time</label>
              <DatePicker
                date={returnTime || new Date()}
                onSelect={setReturnTime}
              />
              {returnTimeError && (
                <span className="text-red-500">{returnTimeError}</span>
              )}
            </div>
          </div>
        </div>
        <div className="pb-4 flex items-center gap-x-3">
          <button
            type="button"
            onClick={handleClose}
            className="basis-1/2 h-[42px] rounded-lg border border-[#0056a3] hover:bg-[#0056a3] group"
          >
            <span className="text-black group-hover:text-white">Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="basis-1/2 h-[42px] rounded-lg border border-[#0056a3] bg-[#0056a3] group"
          >
            <span className="text-gray-200 group-hover:text-white">Rent</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
