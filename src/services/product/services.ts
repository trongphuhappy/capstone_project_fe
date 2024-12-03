import { useMutation } from "@tanstack/react-query";
import {
  addToWishList,
  confirmProduct,
  createProduct,
} from "@/services/product/api-services";
import useToast from "@/hooks/use-toast";
import { useAppDispatch } from "@/stores/store";
import { closeBackdrop, openBackdrop } from "@/stores/stateSlice";

export const useServiceCreateProduct = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TCreateProduct>({
    mutationFn: async (data: REQUEST.TCreateProduct) => {
      const formData = new FormData();
      formData.append("Name", data.name || "");
      formData.append("Description", data.description || "");
      formData.append("Value", data.value?.toString() || "");
      formData.append("Price", data.price?.toString() || "");
      formData.append("CategoryId", data.categoryId?.toString() || "");
      formData.append(
        "MaximumRentDays",
        data.maximumRentDays?.toString() || ""
      );
      formData.append("Policies", data.policies || "");
      formData.append("InsuranceName", data.insuranceName || "");
      formData.append("IssueDate", data.issueDate || "");
      formData.append("ExpirationDate", data.expirationDate || "");

      if (data.productImages) {
        data?.productImages.forEach((image) => {
          formData.append("ProductImages", image);
        });
      }

      if (data?.insuranceImages) {
        data?.insuranceImages.forEach((image) => {
          formData.append("InsuranceImages", image);
        });
      }

      if (data?.listSurcharges) {
        data.listSurcharges.forEach((surcharge, index) => {
          formData.append(
            `ListSurcharges[${index}].SurchargeId`,
            surcharge.SurchargeId
          );
          formData.append(
            `ListSurcharges[${index}].Price`,
            surcharge.Price.toString()
          );
        });
      }

      return await createProduct(formData);
    },
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      // dispatch(setAvatarImage(data.value.data));
      // dispatch(setAvatarProfile(data.value.data));
      addToast({
        type: "success",
        description: data.value.message,
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};

export const useServiceConfirmProduct = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TConfirmProduct>({
    mutationFn: confirmProduct,
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      addToast({
        type: "success",
        description: data.value.message,
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};

export const useServiceAddWishlistProduct = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TAddToWishlist>({
    mutationFn: addToWishList,
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      addToast({
        type: "success",
        description: data.value.message,
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};
