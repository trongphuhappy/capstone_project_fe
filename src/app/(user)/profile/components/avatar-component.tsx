import { useAppSelector } from "@/stores/store";

export default function AvatarComponent() {
  const userProfile = useAppSelector((state) => state.userSlice);

  return (
    <div>
      <div className="relative">
        <img
          src="/images/auth.jpg"
          alt="thumbnail"
          className="w-full h-[100px] object-cover"
        />
        <figure
          className={`absolute left-[15%] -bottom-[80%] -translate-y-1/2 -translate-x-1/2 border w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 cursor-pointer shadow-avatar ${
            userProfile &&
            "hover:bg-[linear-gradient(to_top,_#d16ba5,_#c777b9,_#ba83ca,_#aa8fd8,_#9a9ae1,_#8aa7ec,_#79b3f4,_#69bff8,_#52cffe,_#41dfff,_#46eefa,_#5ffbf1)]"
          }`}
        >
          <div
            style={{
              borderRadius: "50%",
              overflow: "hidden",
            }}
            className="flex items-center justify-between"
          >
            <img
              src={userProfile.profile?.avatar || "/images/avatar.png"}
              className="w-full h-full"
              alt="avatar"
            />
          </div>
        </figure>
      </div>
    </div>
  );
}
