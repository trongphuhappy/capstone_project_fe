"use client";

import { useEffect, useState } from "react";
// import useAddedCartDialog from "@/hooks/use-added-cart-dialog";
import { useAppSelector } from "@/stores/store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { productCategories } from "@/utils/locales/en-US/product";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useGetAllWishlist from "@/hooks/use-get-all-wishlist";
import useAddWishlist from "@/hooks/use-add-wishlist";
import useToast from "@/hooks/use-toast";
import useRentDialog from "@/hooks/use-rent-dialog";

interface Lessor {
  shopName: string;
  description: string;
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  images: string[];
  lessor: Lessor;
  price: number;
  timeUnit: string;
  location: string;
  policies: string[];
  quantity: number;
}

interface CartItemProps {
  product: ProductDetails;
  index: number;
  onRemoveProduct: (index: number) => void;
  onChangeQuantity: (index: number, newQuantity: number) => void;
}

const WishlistComponent = () => {
  const { addToast } = useToast();
  const userState = useAppSelector((state) => state.userSlice);
  const { addWishlistProduct } = useAddWishlist();
  const { getAllWishListApi, isPending } = useGetAllWishlist();
  const [products, setProducts] = useState<API.TGetProducts | null>(null);

  const router = useRouter();
  const { onOpenRentProductDialog } = useRentDialog();

  const handleGetWishlist = async () => {
    const res = await getAllWishListApi({ pageIndex: 1, pageSize: 10 });
    if (res) setProducts(res?.value.data || null);
  };

  useEffect(() => {
    handleGetWishlist();
  }, []);

  const handleRemoveProduct = async (productId: string) => {
    await addWishlistProduct(
      {
        productId: productId,
      },
      handleGetWishlist
    );
  };

  const handleGoToProductsPage = () => {
    router.push("/products");
  };

  const renderProducts = () => {
    return products?.items?.map((product) => (
      <div
        key={product.id}
        className="mb-6 p-6 sm:flex sm:justify-start border-b border-t items-center"
      >
        <div className="sm:w-1/3">
          <Link href={`/product/${product.id}`}>
            <img
              src={product.productImagesUrl[0]}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </Link>
        </div>
        <div className="sm:ml-4 w-full">
          <Link href={`/product/${product.id}`}>
            <div className="flex justify-end cursor-pointer">
              <IoClose
                className="text-xl text-red-500"
                onClick={() => handleRemoveProduct(product.id)}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-xs mt-1 font-normal">
              Cateogory:{" "}
              <b className="font-normal">{product.category?.categoryName}</b>
            </p>
            <p className="text-xs mt-2 font-normal">
              Shop name:{" "}
              <b className="font-normal">{product.lessor.shopName}</b>
            </p>
          </Link>
          <div className="flex items-end border-gray-100 mt-2 justify-between">
            <Link href={`/product/${product.id}`}>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs">Rent price: </p>
                  <p className="mt-2 text-xl font-bold">
                    {formatCurrencyVND(product.price)} / Day
                  </p>
                </div>
              </div>
            </Link>
            <button
              onClick={() => handleRentNow(product)}
              className="bg-[#0056a3] text-white py-2 px-6 rounded-full hover:opacity-90"
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const handleRentNow = (product: API.TProduct) => {
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
    <div className="flex flex-col min-h-screen pt-20 font-montserrat">
      <h1 className="mb-10 text-center text-2xl font-bold">My Wishlist</h1>
      <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-10 xl:px-0">
        {products?.items && products?.items?.length > 0 ? (
          <div className="rounded-lg w-full">{renderProducts()}</div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <img
              src="/images/empty-wishlist.png"
              alt="Empty cart"
              className="w-full h-48 mb-4"
            />
            <p className="text-2xl text-gray-700 mb-4">
              Your Wish list is{" "}
              <span className="text-red-500 text-2xl">Empty!</span>
            </p>
            <span className="text-gray-500 text-lg">Explore more</span>
            <button
              onClick={handleGoToProductsPage}
              className="flex items-center space-x-2 rounded-full bg-red-500 py-2 px-6 text-white hover:bg-blue-600"
            >
              <FaArrowLeft />
              <span>Return to shop</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistComponent;
