import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IoMdClose } from "react-icons/io";
import { formatCurrencyVND } from "@/utils/format-currency";
import { PiListHeart } from "react-icons/pi";
import useAddWishlist from "@/hooks/use-add-wishlist";
import { useAppSelector } from "@/stores/store";
import useRentDialog from "@/hooks/use-rent-dialog";
import useToast from "@/hooks/use-toast";

interface QuickViewCardProps {
  open: boolean;
  onOpenChange: () => void;
  product?: API.TProduct | null;
}

export default function QuickViewCard({
  open,
  onOpenChange,
  product,
}: QuickViewCardProps) {
  const { addToast } = useToast();
  const userState = useAppSelector((state) => state.userSlice);
  const handleClose = () => {
    onOpenChange();
  };
  const { addWishlistProduct } = useAddWishlist();
  const { onOpenRentProductDialog } = useRentDialog();
  const [wishlist, setWishlist] = useState<boolean>(
    product?.isAddedToWishlist || false
  );
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const handleChangeWishlist = async () => {
    setWishlist((prev) => !prev);
  };

  const handleAddToWishlist = async () => {
    await addWishlistProduct(
      {
        productId: product?.id || "",
      },
      handleChangeWishlist
    );
  };

  const handleRentNow = () => {
    handleClose();
    if (userState.profile != null) {
      if (product) {
        if (product.confirmStatus === 1) {
          onOpenRentProductDialog(product);
        } else {
          {
            product.confirmStatus === 0 &&
              addToast({
                type: "error",
                description:
                  "This product has not been approved by the admin so it cannot be purchased",
              });
          }
          {
            product.confirmStatus === -1 &&
              addToast({
                type: "error",
                description: `The product was rejected with reason: ${product?.rejectReason}`,
              });
          }
          return;
        }
      }
    } else {
      addToast({
        type: "error",
        description: "Please login to rent this product",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="flex max-w-xs xl:max-w-7xl lg:max-w-4xl md:max-w-2xl pl-3 pr-0 mx-auto font-montserrat">
        <div className="w-full h-[80vh] overflow-y-auto">
          <div
            className="absolute top-4 right-6 cursor-pointer"
            onClick={handleClose}
          >
            <IoMdClose className="text-2xl text-gray-700" />
          </div>
          <div className="mt-6 mr-5 grid grid-cols-1 lg:grid-cols-2">
            <div className="px-4">
              <img
                src={
                  product?.productImagesUrl[selectedImage] || "/images/auth.jpg"
                }
                alt={product?.name}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="mt-4 grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-y-4 gap-x-3">
                {product?.productImagesUrl?.map((image, index) => {
                  return (
                    <div key={index} className="flex-1">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className={`w-[120px] h-[120px] ${
                          selectedImage === index
                            ? "border-2 border-[#0056a3]"
                            : ""
                        }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full">
              <div>
                <div className="pb-4">
                  <h1 className="font-semibold text-[#111111] text-2xl uppercase mt-10 sm:mt-10">
                    {product?.name}
                  </h1>
                  <hr className="mt-4" />
                  <div className="flex items-center gap-x-3 mt-4">
                    <p className="text-base ">Shop name: </p>
                    <p className="text-gray-500">
                      {product?.lessor?.shopName || "No shop name"}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-3 mt-4">
                    <p className="text-base ">Location: </p>
                    <p className="text-gray-500">
                      {product?.lessor?.wareHouseAddress || "No location"}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-3 mt-4">
                    <p className="text-base ">Rent Price: </p>
                    <p className="text-gray-500">
                      {formatCurrencyVND(product?.price || 0)}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-3 mt-4">
                    <p className="text-base ">Maximum Rent Days: </p>
                    <p className="text-gray-500">{product?.maximumRentDays}</p>
                  </div>
                </div>
                <hr className="mb-4" />
                <div className="my-2">
                  <div className="flex items-center gap-x-3">
                    <button
                      type="button"
                      className="w-full h-[56px] px-[12px] border border-[#0056a3] rounded-3xl group"
                      onClick={handleAddToWishlist}
                    >
                      <span className="flex items-center justify-center text-[12px] sm:text-[14px] font-semibold text-[#0056a3] group-hover:text-opacity-50">
                        <PiListHeart className="mr-2 text-lg" />
                        {wishlist === false
                          ? "Add To Wishlist"
                          : "Remove From Wishlist"}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="w-full h-[56px] px-[12px] border border-[#0056a3] bg-[#0056a3] rounded-3xl hover:opacity-90"
                      onClick={handleRentNow}
                    >
                      <span className="font-semibold text-white text-[12px] sm:text-[14px]">Rent Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
