import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/services/product/api-services";

export const useServiceCreateProduct = () => {
  return useMutation<TResponse, TMeta, REQUEST.TCreateProduct>({
    mutationFn: createProduct,
  });
};
