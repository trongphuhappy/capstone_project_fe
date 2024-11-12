"use client";

import CartProductItem from "@/components/cart-product-item-v1";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filters } from "@/const/products";
import useGetProductsFilter from "@/app/(user)/products/hooks/useGetProductsFilter";
import { useEffect, useState } from "react";
import PaginatedComponent from "@/components/paginated";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isVehical = searchParams.get("isVehicle");

  const [category, setCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [location, setLocation] = useState<string | null>(
    searchParams.get("location")
  );
  const [sortField, setSortField] = useState<string | null>(
    searchParams.get("sortField")
  );
  const [order, setOrder] = useState<string | null>(searchParams.get("order"));

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { products, handleGetProductsFilter } = useGetProductsFilter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleGetData(page);
  };

  const handleGetData = async (pageIndex: number) => {
    await handleGetProductsFilter({
      isVehicle:
        category !== null && category !== "others"
          ? category === "vehicles"
          : undefined,
      location:
        location !== "others"
          ? (location as "common.location.HCM" | "common.location.HN")
          : undefined,
      sortField:
        sortField !== "others"
          ? (sortField as "createdAt" | "price" | "accessCount")
          : undefined,
      order: order !== "others" ? (order as "ASC" | "DESC") : undefined,
      page: pageIndex,
      take: 12,
    });
  };

  const updateQueryParams = () => {
    const queryParams: Record<string, string | null> = {
      category,
      location,
      sortField,
      order,
      page: currentPage.toString(),
    };

    const cleanQueryParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams)
        .filter(([key, value]) => value !== null) 
        .map(([key, value]) => [key, value as string]) 
    );

    router.push(`/products?${new URLSearchParams(cleanQueryParams).toString()}`);
  };

  useEffect(() => {
    if (currentPage !== 1) {
      handleGetData(1);
      setCurrentPage(1);
    } else {
      handleGetData(currentPage);
    }
  }, [category, location, sortField, order]);

  useEffect(() => {
    updateQueryParams(); // Update URL on initial load or when state changes
  }, [category, location, sortField, order, currentPage]);

  return (
    <div className="my-3 py-5 px-[50px] font-montserrat">
      <div>
        <div className="flex items-baseline gap-x-5">
          <h3 className="font-semibold text-3xl">123</h3>
          <span className="font-normal text-base">
            {products?.meta?.itemCount} product
          </span>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-x-8 pb-6 border-b-[1px] border-[#e5e5e5]">
            {filters?.map((filter, index) => (
              <Select
                key={index}
                onValueChange={(value) => {
                  if (filter.title === "Categories") {
                    setCategory(value);
                  }
                  if (filter.title === "Locations") {
                    setLocation(value);
                  }
                  if (filter.title === "Sort by") {
                    setSortField(value);
                  }
                  if (filter.title === "Order") {
                    setOrder(value);
                  }
                }}
              >
                <SelectTrigger className="w-[180px] rounded-3xl bg-[#f5f5f5] border-none hover:bg-[#d5d5d5] text-[#11111] text-xs font-bold">
                  <SelectValue placeholder={filter.title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filter.sub?.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.id} // Using `id` here for state consistency
                        className="font-montserrat py-2 select-none"
                      >
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ))}
          </div>
          <div className="py-6">
            <div className="grid grid-cols-5 gap-y-4">
              {products?.data?.map(
                (product: API.IProductCard, index: number) => {
                  return <CartProductItem key={index} product={product} />;
                }
              )}
            </div>
            <div className="mt-5">
              <PaginatedComponent
                totalPages={products?.meta?.pageCount || 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
