import {
  CreateProductBody,
  CreateProductBodyType,
} from "@/utils/schema-validations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useCreateProduct() {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      description: "",
      policies: "",
      value: 0,
      price: 0,
      maximumRentDays: 1,
    },
  });

  return {
    register,
    errors,
    handleSubmit,
    control,
    watch,
  };
}
