import { useServiceLogout } from "@/services/auth/services";
import { useAppDispatch } from "@/stores/store";
import { removeInfoLogin } from "@/stores/user-slice";
import { removeStorageItem } from "@/utils/local-storage";

export default function useLogout() {
  const { mutate, isPending } = useServiceLogout();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    try {
      mutate();
    } catch (err) {
      removeStorageItem("accessToken");
      dispatch(removeInfoLogin());
      location.href = "/";
      return err;
    }
  };
  return {
    isPending,
    handleLogout,
  };
}
