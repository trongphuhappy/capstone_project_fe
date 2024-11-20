// import {
//   getProductDetails,
//   getProducts,
// } from "@/services/products/api-services";
// import { IPaginationResponse } from "@/typings";
import { product } from "@/utils/locales/en-US/product";

// export const useServiceProductPage = async (
//   pagination: API.IProductPaginationParams
// ) => {
//   try {
//     const response = await getProducts(pagination);
//     const data =
//       response.result as unknown as IPaginationResponse<API.IProductCard>;
//     return data;
//   } catch (err) {
//     return null;
//   }
// };

export const useServiceProductDetails = async (productId?: number | string) => {
  try {
    // const response = await getProductDetails(productId);
    // const data = response.result.data as unknown as API.IProductDetails;
    // return data;
  } catch (err) {
    return null;
  }
};

// export const useMostViewedProducts = (pagination: IProductsPagination) => {
//   return useInfiniteQuery({
//     queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED, pagination.isVehicle],
//     queryFn: ({ pageParam = 1 }) => getMostViewedProducts({ ...pagination, page: pageParam }),
//     getNextPageParam: (lastPage, allPages) => {
//       const { hasNextPage } = lastPage.meta;
//       return hasNextPage ? allPages.length + 1 : undefined;
//     },
//   });
// };

// export const useMostRatedProducts = (pagination: IProductsPagination) => {
//   return useInfiniteQuery({
//     queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_RATED, pagination.isVehicle],
//     queryFn: ({ pageParam = 1 }) => getMostRatedProducts({ ...pagination, page: pageParam }),
//     getNextPageParam: (lastPage, allPages) => {
//       const { hasNextPage } = lastPage.meta;
//       return hasNextPage ? allPages.length + 1 : undefined;
//     },
//   });
// };

// export const useCreateNewProducts = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     [API_ENDPOINTS.PRODUCTS],
//     (formFields: TProductFormField) => postNewProduct(formFields),
//     {
//       onSettled: () => {
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_RATED],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCTS],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCT_DETAILS],
//         });
//       },
//     },
//   );
// };

// export const useReviewProductApproval = () => {
//   const queryClient = useQueryClient();
//   return useMutation<any, TMeta, TProductApprovalFormFields>(
//     [API_ENDPOINTS.PRODUCT_ADMIN_APPROVE],
//     (formFields: TProductApprovalFormFields) => approveProduct(formFields),
//     {
//       onSettled: () => {
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_RATED],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCTS],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [API_ENDPOINTS.PRODUCT_DETAILS],
//         });
//       },
//     },
//   );
// };

export function convertToProductCard(
  productDetails: API.IProductDetails
): API.IProductCard {
  return {
    id: productDetails.id,
    name: productDetails.name,
    price: productDetails.price,
    timeUnit: productDetails.timeUnit,
    value: productDetails.value,
    accessCount: productDetails.productSurcharges.length,
    rating: productDetails.averageStar,
    completedOrder: productDetails.numberOfCompletedOrders ?? 0,
    status: productDetails.status,
    turnOver: productDetails.productSurcharges.reduce(
      (total: number, surcharge) => total + surcharge.price,
      0
    ),
    category: {
      ...productDetails.category,
      id:
        typeof productDetails.category.id === "string"
          ? Number(productDetails.category.id)
          : productDetails.category.id,
    },
    lessorId: productDetails.lessor.id,
    lessorImage: productDetails?.lessor?.avatar || "",
    image: productDetails.images[0] || "",
  };
}
