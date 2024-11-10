import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatCurrencyVND } from "@/utils/format-currency";
import { DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface QuickViewCartProps {
  open: boolean;
  onClose: () => void;
}

export default function QuickViewCart({ open, onClose }: QuickViewCartProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[1000px] px-3 pt-2 pb-7 my-0">
        <div
          className="ml-auto mr-0 group cursor-pointer absolute right-2 top-3"
          onClick={onClose}
        >
          <X
            strokeWidth={2.75}
            className="w-5 h-5 text-slate-400 group-hover:text-black"
          />
        </div>
        <div className="mt-4 w-[950px] grid grid-cols-[50%_50%] gap-x-5">
          <div className="h-[440px] bg-[#e6e6e6] group-hover:scale-95 transition-all">
            <div className="w-full mx-auto flex items-center justify-center bg-transparent">
              <img
                // src={images[0]}
                src="/images/car1.png"
                alt={`Furniture`}
                className="w-full h-full block object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-montserrat text-2xl font-medium">
              ROMUS, Corner Sofa - Sofa góc SOF_043, 210x145x85cm, sản xuất bởi
              Scandi Home
            </h2>
            <p className="text-base font-montserrat mt-1">
              Thương hiệu: <span className="text-blue-500">Judar</span>
            </p>
            <div className="flex items-baseline font-montserrat">
              <p className="text-2xl text-[#ef1104] font-semibold">
                {formatCurrencyVND(575213213)}
              </p>
              <p className="text-[#a5a5a5]">27.844.830₫</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
