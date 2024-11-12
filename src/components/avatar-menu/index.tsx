import useLogout from "@/hooks/use-logout";
import { useAppSelector } from "@/stores/store";
import { FaQuestionCircle } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface AvatarMenuProps {
  onCloseTooltip: () => void;
}

export default function AvatarMenu({ onCloseTooltip }: AvatarMenuProps) {
  const router = useRouter();
  const userState = useAppSelector((state) => state.userSlice);
  const { handleLogout } = useLogout();

  const handleNavigate = (index: number) => {
    switch (index) {
      case 1: {
        router.push("/profile/information");
        onCloseTooltip();
        break;
      }
      case 2: {
        router.push("/admin/dashboard");
        onCloseTooltip();
        break;
      }
      case 3: {
        onCloseTooltip();
        // handleOpenTabMessage();
        break;
      }
      case 4: {
        router.push("/staff/application");
        onCloseTooltip();
      }
      default:
        break;
    }
  };

  return (
    <div className="z-10 bg-white right-0 rounded-lg shadow-box w-64 overflow-hidden">
      <div
        className="px-4 py-3 text-lg text-gray-900 hover:bg-gray-200 select-none cursor-pointer border-b-2"
        onClick={() => {}}
      >
        <div className="font-bold">Hello</div>
        <div className="text-xs text-gray-500 truncate">
          {userState.profile?.userName}
        </div>
      </div>
      <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
        <li>
          <div
            onClick={() => handleNavigate(1)}
            className="cursor-pointer flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-gray-200"
          >
            <div className="flex items-center">
              <IoSettingsSharp
                className="p-1 bg-gray-300 text-black rounded-full mr-2"
                size={30}
              />
              <span className="text-black">Setting</span>
            </div>
            <FiChevronRight className="text-gray-500" size={24} />
          </div>
        </li>
        <li>
          <div
            className="flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => handleNavigate(3)}
          >
            <div className="flex items-center">
              <FaQuestionCircle
                className="p-1 bg-gray-300 text-black rounded-full mr-2"
                size={30}
              />
              <span className="text-black">Support</span>
            </div>
            <FiChevronRight className="text-gray-500" size={24} />
          </div>
        </li>
      </ul>

      <div className="py-1">
        <div
          onClick={handleLogout}
          className="cursor-pointer flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-gray-200"
        >
          <div className="flex items-center">
            <LuLogOut
              className="p-1 bg-gray-300 text-black rounded-full mr-2"
              size={30}
            />
            <span className="text-black">Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
