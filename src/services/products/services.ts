import { getProducts } from "@/services/products/api-services";
import { IPaginationResponse } from "@/typings";

export const useServiceProductPage = async (
  pagination: API.IProductPaginationParams
) => {
  try {
    const response = await getProducts(pagination);
    const data =
      response.result as unknown as IPaginationResponse<API.IProductCard>;
    return data;
  } catch (err) {
    return null;
  }
};

// export const useProductDetails = (productId?: number | string) =>
//   useQuery<API.IProductDetails>(
//     [API_ENDPOINTS.PRODUCT_DETAILS, productId],
//     () => getProductDetails(productId),
//     {
//       enabled: !!productId,
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   );

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
