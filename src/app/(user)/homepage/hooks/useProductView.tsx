// import { useServiceProductPage } from "@/services/products/services";
import { useState } from "react";

export default function useProductView() {
  // const [product, setProduct] = useState<API.IProductCard[]>([]);
  const product = null;
  const handleProductView = async (isVehicle: boolean) => {
    // const res = await useServiceProductPage({
    //   sortField: "createdAt",
    //   order: "DESC",
    //   isVehicle: isVehicle,
    //   page: 1,
    //   take: 12,
    //   isConfirmedByAdmin: true,
    // });
    // if (res) setProduct(res.data);
  };

  return { handleProductView, product };
}
