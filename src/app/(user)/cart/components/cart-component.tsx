"use client";

import useAddedCartDialog from "@/hooks/use-added-cart-dialog";
import { useAppSelector } from "@/stores/store";
import { formatCurrencyVND } from "@/utils/format-currency";
import {
  productCategories,
  productLocale,
} from "@/utils/locales/en-US/product";
import Link from "next/link";
import { Fragment } from "react";

export default function CartComponent() {
  const { products, onRemoveProductCart, onClearProductCart } =
    useAddedCartDialog();

  const handleRemoveCart = (index: number) => {
    onRemoveProductCart(index);
  };

  const handleClearCart = () => {
    onClearProductCart();
  };

  const renderProducts = () => {
    return products?.map((product: API.IProductCard, index: number) => {
      return (
        <div
          key={index}
          className="flex justify-between hover:bg-slate-100 pr-3"
        >
          <div className="py-2 px-2 flex items-start gap-x-4 cursor-pointer">
            <img
              src={product.image}
              alt={product.name}
              className="w-[100px] h-[100px] border"
            />
            <div className="flex flex-col gap-y-2">
              <h3 className="text-base">Name: {product.name}</h3>
              <p className="font-montserrat text-[15px]">
                Type: {productCategories[product?.category?.name]}
              </p>
              <div className="flex items-baseline gap-x-3">
                <span className="text-base font-montserrat">Price:</span>
                <p className="text-2xl text-black font-semibold">
                  {product && formatCurrencyVND(product?.price)}
                  {product && productLocale[product?.timeUnit]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-y-2">
            <button
              type="button"
              className="hover:text-blue-600"
              onClick={() => handleRemoveCart(index)}
            >
              <span className="text-[15px]">Remove</span>
            </button>

            <button type="button" className="hover:text-blue-600">
              <Link href={`/product/${product.id}`}>
                <span className="text-[15px]">View detail</span>
              </Link>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="px-[50px] font-montserrat">
      {products?.length > 0 ? (
        <Fragment>
          <div className="mt-6">
            <h2 className="text-4xl font-semibold">Cart</h2>
          </div>
          <div className="mt-5 py-4">
            <div className="flex items-start gap-x-7">
              <div className="w-[70%]">
                <div className="pb-2 border-b flex justify-between">
                  <span className="text-[17px]">
                    {products?.length} Products in Cart
                  </span>
                  <button
                    type="button"
                    className="ml-3 hover:text-blue-600"
                    onClick={handleClearCart}
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-col gap-y-3 my-2">
                  {renderProducts()}
                </div>
              </div>
              <div className="w-[30%]">
                <div className="pb-2">
                  <h3 className="font-semibold text-[17px] text-[#6a6f73]">
                    Total:
                  </h3>
                  <div className="mt-4 flex items-baseline gap-x-3">
                    <p className="text-2xl text-black font-semibold">
                      {formatCurrencyVND(
                        products?.reduce((acc, cur) => acc + cur.price, 0)
                      )}
                    </p>
                  </div>
                  <button className="mt-3 h-[45px] bg-blue-700 w-full hover:bg-blue-600">
                    <span className="text-xl text-white">Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="mt-3 py-4 h-[40vh] text-center">
            <h3 className="text-5xl">Cart is empty</h3>
            <button
              type="button"
              className="mt-10 h-[50px] bg-blue-700 hover:bg-blue-600"
            >
              <Link href={"/products?page=1"}>
                <span className="px-7 text-white text-3xl">Discover</span>
              </Link>
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
}
