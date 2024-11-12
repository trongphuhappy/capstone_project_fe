import { useServiceProductPage } from "@/services/products/services";
import { IPaginationResponse } from "@/typings";
import { useState } from "react";

export default function useGetProductsFilter() {
  const [products, setProducts] =
    useState<IPaginationResponse<API.IProductCard>>();

  const handleGetProductsFilter = async (filter: REQUEST.IFilterProducts) => {
    const res = await useServiceProductPage({
      sortField: filter.sortField !== undefined ? filter.sortField : "",
      order: filter.order !== undefined ? filter.order : "",
      isVehicle: filter.isVehicle !== undefined ? filter.isVehicle : "",
      location: filter.location !== undefined ? filter.location : "",
      page: filter.page,
      take: filter.take,
      isConfirmedByAdmin: true,
    });
    if (res) setProducts(res);
  };

  return { handleGetProductsFilter, products };
}