import ImageGallery from "@/app/(user)/product/components/ImageGallery";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAddedCartDialog from "@/hooks/useAddedCartDialog";
import { formatCurrencyVND } from "@/utils/format-currency";
import { productCategories, productLocale } from "@/utils/locales/en-US/product";
import { DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Ratings } from "../ui/rating";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface QuickViewCartProps {
  open: boolean;
  onClose: () => void;
  product: API.IProductCard | null;
}

const images = [
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
];

export default function QuickViewCart({
  open,
  onClose,
  product,
}: QuickViewCartProps) {
  const router = useRouter();

  const { onOpenAddedCartDialog } = useAddedCartDialog();

  const handleAddToCart = () => {
    onClose();
    onOpenAddedCartDialog();
  };

  const nextViewDetail = () => {
    onClose();
    router.push(`/product/${product?.id}`);
  };

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
        <div className="mt-4 flex justify-between gap-x-5">
          <div className="w-[50%] h-[440px] bg-[#e6e6e6] group-hover:scale-95 transition-all">
            <div className="w-full mx-auto flex items-center justify-center bg-transparent border">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-full block object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-montserrat text-2xl font-medium">
              {product?.name}
            </h2>
            <p className="text-base font-montserrat mt-4">
              Category:{" "}
              <span className="text-gray">
                {product?.category &&
                  product?.category?.name !== "" &&
                  productCategories[product?.category?.name]}
              </span>
            </p>
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Rating: </p>
              <Ratings variant="yellow" rating={product?.rating || 0} />
            </div>
            <div className="mt-4 flex items-baseline gap-x-3">
              <span className="text-base font-montserrat">Price:</span>
              <p className="text-2xl text-black font-semibold">
                {product && formatCurrencyVND(product?.price)}
                {product && productLocale[product?.timeUnit]}
              </p>
            </div>
            <div className="mt-10 flex items-start gap-x-3">
              <button
                type="button"
                className="h-11 border border-black rounded-lg w-full hover:bg-black group"
              >
                <div onClick={nextViewDetail}>
                  <span className="font-montserrat font-semibold text-base group-hover:text-white">
                    View detail
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="h-11 border border-black rounded-lg w-full bg-black group"
              >
                <span className="font-montserrat font-semibold text-base text-gray-200 group-hover:text-white">
                  Add cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
