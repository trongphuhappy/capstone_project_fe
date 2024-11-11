"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatCurrencyVND } from "@/utils/format-currency";
import { BsCheckCircleFill } from "react-icons/bs";

interface AddedCartDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddedCartDialog({
  open,
  onClose,
}: AddedCartDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
        <div>
          <div className="!py-3 !px-5 flex justify-between items-center bg-[#eff8f0]">
            <div className="flex items-center">
              <BsCheckCircleFill className="text-[#2eb346] inline-block mr-1" />
              <span className="font-montserrat text-[#2eb346]">
                Added to cart successfully
              </span>
            </div>
            <div className="group cursor-pointer" onClick={onClose}>
              <X
                strokeWidth={2.75}
                className="w-5 h-5 text-slate-400 group-hover:text-black"
              />
            </div>
          </div>
          <div className="!pt-4 !pb-2 !px-5">
            <div className="flex items-start pb-5 border-b-[1px]">
              <div className="w-[70px] min-h-[70px] mr-5">
                <img
                  loading="lazy"
                  src="//product.hstatic.net/1000378223/product/den_truoc_7d9abb346c204234b5267a3a85329047_small.jpg"
                  alt="Áo Thun - AT - PLS1210 BD448"
                  className="vertical-align-middle w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-montserrat font-light text-[#353535]">
                  Áo Thun - AT - PLS1210 BD448
                </h3>
                <span className="text-[#979797] font-montserrat">Type</span>
              </div>
            </div>
            <div className="pt-3 pb-6 border-b-[1px]">
              <div className="flex items-start justify-between">
                <h4 className="font-montserrat font-light text-[#2F80ED]">
                  Shopping cart is available
                </h4>
                <div className="">
                  <span className="font-montserrat text-base text-black font-semibold">
                    {formatCurrencyVND(2000)}
                  </span>
                </div>
              </div>
              <p className="text-[#979797] text-base font-montserrat text-right">
                (2) product
              </p>
            </div>
            <div className="pt-7 pb-4 flex items-center gap-x-3">
              <button className="basis-1/2 h-[42px] rounded-lg border border-black hover:bg-black group">
                <span className="text-black group-hover:text-white">Pay</span>
              </button>
              <button className="basis-1/2 h-[42px] rounded-lg border border-black bg-black group">
                <span className="text-gray-200 group-hover:text-white">
                  View cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
