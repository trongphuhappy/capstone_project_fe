"use client";

import { useState } from "react";
// import useAddedCartDialog from "@/hooks/use-added-cart-dialog";
import { useAppSelector } from "@/stores/store";
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
    {
      id: "4",
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

  const handleGoToProductsPage = () => {
    router.push("/products");
  };

  const renderProducts = () => {
    return products.map((product) => (
      <div key={product.id} className="mb-6 p-6 sm:flex sm:justify-start border-b border-t items-center">
        <div className="sm:w-1/3">
          <img src={product.images[0]} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div className="sm:ml-4 w-full">
          <div className="flex justify-end">
            <IoClose
              className="text-xl text-red-500"
              onClick={() => handleRemoveProduct(product.id)}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="mt-1 text-lg text-gray-700">{product.description}</p>

          <div className="flex items-end border-gray-100 mt-2 justify-between">
            <p className="text-2xl">
              {formatCurrencyVND(product.price * product.quantity)}
            </p>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-[#0056a3] text-white py-2 px-6 rounded-full hover:opacity-90"
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    ));
  };


  const isCartEmpty = products.length === 0;

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">My Wishlist</h1>
      <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-10 xl:px-0">
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <img
              src="/images/empty-wishlist.png"
              alt="Empty cart"
              className="w-full h-48 mb-4"
            />
            <p className="text-2xl text-gray-700 mb-4">
              Your Wish list is <span className="text-red-500 text-2xl">Empty!</span>
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
        ) : (
          <div className="rounded-lg w-full">
            {renderProducts()}
          </div>
        )}

      </div>
    </div>
  );
};

export default CartComponent;
