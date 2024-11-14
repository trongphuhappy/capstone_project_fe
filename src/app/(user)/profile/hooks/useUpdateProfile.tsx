import { z } from "zod";
import {
  UpdateProfileBody,
  UpdateProfileBodyType,
} from "@/utils/schema-validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UpdateProfileProps {
  id: number;
  email: string;
  fullName: string;
  password?: string;
  avatar?: string;
  address?: string;
  detailedAddress?: string;
  dob?: string;
  phoneNumber?: string;
  role?: string;
  citizenId?: string;
  citizenCardFront?: string;
  citizenCardBack?: string;
  updatedAt?: string;
}

export default function useUpdateProfile({
  id,
  email,
  fullName,
  avatar = "",
  address = "",
  detailedAddress = "",
  dob = "",
  phoneNumber = "",
  role = "",
  citizenId = "",
  citizenCardFront = "",
  citizenCardBack = "",
  updatedAt = "",
}: UpdateProfileProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileBodyType>({
    resolver: zodResolver(UpdateProfileBody),
    defaultValues: {
      id,
      email,
      fullName,
      avatar,
      address,
      detailedAddress,
      dob,
      phoneNumber,
      role,
      citizenId,
      citizenCardFront,
      citizenCardBack,
      updatedAt,
    },
  });

  const onSubmit = (data: UpdateProfileBodyType) => {
    // Handle form submission here
    try {
      console.log("213");
      console.log(data);
    } catch (err) {
      console.log("123");
    }
  };

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
  };
}
