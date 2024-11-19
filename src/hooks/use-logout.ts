import { useServiceLogout } from "@/services/auth/services";

export default function useLogout() {
  const { mutate, isPending } = useServiceLogout();
  const handleLogout = () => {
    try {
      mutate();
    } catch (err) {
      location.href = "/";
      return err;
    }
  };
  return {
    isPending,
    handleLogout,
  };
}
