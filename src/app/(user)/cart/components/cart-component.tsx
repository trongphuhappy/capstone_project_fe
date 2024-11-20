"use client";

import { useState } from "react";
import { formatCurrencyVND } from "@/utils/format-currency";
import { productCategories } from "@/utils/locales/en-US/product";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";


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

const CartComponent = () => {
  const [products, setProducts] = useState<ProductDetails[]>([
    {
      id: "1",
      name: "Hemnes",
      description: "Bed frame, white stain/Luröy, 150x200 cm",
      images: ["/images/banner1.png", "/images/banner2.png", "/images/banner3.png"],
      lessor: { shopName: "GearPro Rentals", description: "Bed frame, white stain/Luröy, 150x200 cm" },
      price: 1200000,
      timeUnit: "month",
      location: "Ho Chi Minh City",
      policies: ["Policy 1: Return within 30 days", "Policy 2: Warranty included"],
      quantity: 1,
    },
    {
      id: "2",
      name: "Hemnes",
      description: "Bed frame, white stain/Luröy, 150x200 cm",
      images: ["/images/banner2.png", "/images/banner2.png", "/images/banner3.png"],
      lessor: { shopName: "GearPro Rentals", description: "Bed frame, white stain/Luröy, 150x200 cm" },
      price: 1200000,
      timeUnit: "month",
      location: "Ho Chi Minh City",
      policies: ["Policy 1: Return within 30 days", "Policy 2: Warranty included"],
      quantity: 1,
    },
    {
      id: "3",
      name: "Hemnes",
      description: "Bed frame, white stain/Luröy, 150x200 cm",
      images: ["/images/banner3.png", "/images/banner2.png", "/images/banner3.png"],
      lessor: { shopName: "GearPro Rentals", description: "Bed frame, white stain/Luröy, 150x200 cm" },
      price: 1200000,
      timeUnit: "month",
      location: "Ho Chi Minh City",
      policies: ["Policy 1: Return within 30 days", "Policy 2: Warranty included"],
      quantity: 1,
    },
  ]);

  const router = useRouter();

  const handleRemoveProduct = (id: string) => {
    setProducts((prevProducts) => {
      const newProducts = prevProducts.filter((product) => product.id !== id);
      return newProducts;
    });
  };

  // const handleUpdateQuantity = (id: string, newQuantity: number) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === id ? { ...product, quantity: newQuantity } : product
  //     )
  //   );
  // };

  const handleGoToProductsPage = () => {
    router.push("/products");
  };

  const renderProducts = () => {
    return products.map((product) => (
      <div key={product.id} className="mb-6 p-6 sm:flex sm:justify-start border-b border-t">
        <div className="sm:w-1/3">
          <img src={product.images[0]} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div className="sm:ml-4 sm:w-2/3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
            <IoClose
              className="text-xl text-red-500"
              onClick={() => handleRemoveProduct(product.id)}
            />
          </div>
          <p className="mt-1 text-xs text-gray-700">{product.description}</p>

          <div className="flex items-end border-gray-100 mt-2 justify-between">
            {/* <div className="flex items-center">
              <button
                className="cursor-pointer rounded-l bg-gray-950 text-white py-1 px-3.5 duration-100 hover:bg-opacity-60"
                onClick={() => {
                  if (product.quantity > 1) {
                    handleUpdateQuantity(product.id, product.quantity - 1);
                  } else {
                    handleRemoveProduct(product.id);
                  }
                }}
              >
                -
              </button>
              <input
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                value={product.quantity}
                readOnly
              />
              <button
                className="cursor-pointer rounded-r bg-gray-950 text-white py-1 px-3 duration-100 hover:bg-opacity-60"
                onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
              >
                +
              </button>
            </div> */}
            <p className="text-xl">
              {formatCurrencyVND(product.price * product.quantity)}
            </p>
          </div>
        </div>
      </div>
    ));
  };


  const isCartEmpty = products.length === 0;

  return (
    <div className="h-screen pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-10 xl:px-0">
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <img
              src="/images/empty-cart.png"
              alt="Empty cart"
              className="w-48 h-48 mb-4"
            />
            <p className="text-2xl text-gray-700 mb-4">
              Your Cart is <span className="text-red-500 text-2xl">Empty!</span>
            </p>
            <span className="text-gray-500">Must add items to the cart before you proceed to checkout</span>
            <button
              onClick={handleGoToProductsPage}
              className="flex items-center space-x-2 rounded-full bg-red-500 py-2 px-6 text-white hover:bg-blue-600"
            >
              <FaArrowLeft />
              <span>Return to shop</span>
            </button>
          </div>
        ) : (
          <div className="rounded-lg md:w-2/3">
            {renderProducts()}
          </div>
        )}

        {!isCartEmpty && (
          <div className="mt-6 h-full rounded-md border bg-gray-100 p-6 shadow-md md:mt-0 md:w-1/3">
            <p className="uppercase border-b py-3">Order summary</p>
            <div className="mb-2 flex justify-between mt-2">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                {formatCurrencyVND(
                  products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total Cost</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {formatCurrencyVND(
                    products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) + 4.99
                  )}
                </p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-[#0056a3] py-1.5 font-medium text-blue-50 hover:opacity-90 uppercase">
              Check out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
