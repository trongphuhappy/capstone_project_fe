import { useAppDispatch } from "@/stores/store";
import { removeProfile } from "@/stores/userSlice";
import { removeStorageItem } from "@/utils/local-storage";

export default function useLogout() {
  // const { mutate, isPending } = useServiceLogout();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    try {
      dispatch(removeProfile());
      removeStorageItem("accessToken");
    } catch (err) {
      location.href = "/";
      return err;
    }
  };
  return {
    // isPending,
    handleLogout,
  };
}
