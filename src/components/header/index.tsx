"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Search from "@/components/search";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/stores/store";
import AvatarMenu from "@/components/avatar-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell, SquarePen } from "lucide-react";
import styles from "@/components/header/main.module.css";
import useCheckExsitLessor from "@/hooks/use-check-exist-lessor";
import useToast from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

interface ISubItem {
  id: number;
  name: string;
  image: string;
}

interface ICategory {
  category: string;
  subItems: ISubItem[];
}

interface INavItem {
  label: string;
  categories: ICategory[];
}

const InitialNavItems: INavItem[] = [
  {
    label: "All Products",
    categories: [
      {
        category: "Beds & mattresses",
        subItems: [
          { id: 1, name: "Bedding", image: "/images/furniture.png" },
          { id: 2, name: "Bath Textiles", image: "/images/car1.png" },
          { id: 3, name: "Curtain & Blinds", image: "/images/banner3.png" },
          { id: 4, name: "Headphones", image: "/images/banner1.png" },
          { id: 5, name: "Headphones", image: "/images/sedan1.jpg" },
          { id: 6, name: "Headphones", image: "/images/suv1.jpg" },
          { id: 7, name: "Headphones", image: "/images/TV-stand1.webp" },
        ],
      },
      {
        category: "Clothing 1",
        subItems: [
          { id: 4, name: "Shirts", image: "/images/banner4.png" },
          { id: 5, name: "Pants", image: "/images/suv1.jpg" },
          { id: 6, name: "Shoes", image: "/images/car2.png" },
        ],
      },
      {
        category: "Home Appliances",
        subItems: [
          { id: 7, name: "Refrigerators", image: "/images/furniture1.png" },
          { id: 8, name: "Washing Machines", image: "/images/furniture2.png" },
          { id: 9, name: "Air Conditioners", image: "/images/furniture3.png" },
        ],
      },
    ],
  },
  {
    label: "Furnitures",
    categories: [
      {
        category: "Beds & mattresses",
        subItems: [
          { id: 1, name: "Bedding", image: "/images/furniture.png" },
          { id: 2, name: "Bath Textiles", image: "/images/car1.png" },
          { id: 3, name: "Curtain & Blinds", image: "/images/banner3.png" },
          { id: 4, name: "Headphones", image: "/images/banner1.png" },
          { id: 5, name: "Headphones", image: "/images/sedan1.jpg" },
          { id: 6, name: "Headphones", image: "/images/suv1.jpg" },
          { id: 7, name: "Headphones", image: "/images/TV-stand1.webp" },
        ],
      },
      {
        category: "Clothing 2",
        subItems: [
          { id: 4, name: "Shirts", image: "/images/banner4.png" },
          { id: 5, name: "Pants", image: "/images/suv1.jpg" },
          { id: 6, name: "Shoes", image: "/images/car2.png" },
        ],
      },
      {
        category: "Home Appliances",
        subItems: [
          { id: 7, name: "Refrigerators", image: "/images/furniture1.png" },
          { id: 8, name: "Washing Machines", image: "/images/furniture2.png" },
          { id: 9, name: "Air Conditioners", image: "/images/furniture3.png" },
        ],
      },
    ],
  },
  {
    label: "Vehicles",
    categories: [
      {
        category: "Beds & mattresses",
        subItems: [
          { id: 1, name: "Bedding", image: "/images/furniture.png" },
          { id: 2, name: "Bath Textiles", image: "/images/car1.png" },
          { id: 3, name: "Curtain & Blinds", image: "/images/banner3.png" },
          { id: 4, name: "Headphones", image: "/images/banner1.png" },
          { id: 5, name: "Headphones", image: "/images/sedan1.jpg" },
          { id: 6, name: "Headphones", image: "/images/suv1.jpg" },
          { id: 7, name: "Headphones", image: "/images/TV-stand1.webp" },
        ],
      },
      {
        category: "Clothing 2",
        subItems: [
          { id: 4, name: "Shirts", image: "/images/banner4.png" },
          { id: 5, name: "Pants", image: "/images/suv1.jpg" },
          { id: 6, name: "Shoes", image: "/images/car2.png" },
        ],
      },
      {
        category: "Home Appliances",
        subItems: [
          { id: 7, name: "Refrigerators", image: "/images/furniture1.png" },
          { id: 8, name: "Washing Machines", image: "/images/furniture2.png" },
          { id: 9, name: "Air Conditioners", image: "/images/furniture3.png" },
        ],
      },
    ],
  },
  {
    label: "E-Neighbor for LESSOR",
    categories: [
      {
        category: "Beds & mattresses",
        subItems: [
          { id: 1, name: "Bedding", image: "/images/furniture.png" },
          { id: 2, name: "Bath Textiles", image: "/images/car1.png" },
          { id: 3, name: "Curtain & Blinds", image: "/images/banner3.png" },
          { id: 4, name: "Headphones", image: "/images/banner1.png" },
          { id: 5, name: "Headphones", image: "/images/sedan1.jpg" },
          { id: 6, name: "Headphones", image: "/images/suv1.jpg" },
          { id: 7, name: "Headphones", image: "/images/TV-stand1.webp" },
        ],
      },
      {
        category: "Clothing 2",
        subItems: [
          { id: 4, name: "Shirts", image: "/images/banner4.png" },
          { id: 5, name: "Pants", image: "/images/suv1.jpg" },
          { id: 6, name: "Shoes", image: "/images/car2.png" },
        ],
      },
      {
        category: "Home Appliances",
        subItems: [
          { id: 7, name: "Refrigerators", image: "/images/furniture1.png" },
          { id: 8, name: "Washing Machines", image: "/images/furniture2.png" },
          { id: 9, name: "Air Conditioners", image: "/images/furniture3.png" },
        ],
      },
    ],
  },
  {
    label: "Contact Us",
    categories: [],
  },
];

export default function Header() {
  const { addToast } = useToast();
  const router = useRouter();
  const userState = useAppSelector((state) => state.userSlice);
  const [avatarMenuTooltip, setAvatarMenuTooltip] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { checkExistLessorApi } = useCheckExsitLessor();

  const handleCategoryHover = (item: INavItem) => {
    setOpenLabel(item.label);
    if (item.categories && item.categories.length > 0) {
      setSelectedCategory(item.categories[0].category);
    }
  };

  const handleCategoryLeave = () => {
    setOpenLabel(null);
  };


  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory !== categoryName) {
      setSelectedCategory(categoryName);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Kiểm tra ngay khi component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    console.log("Selected Category has changed:", selectedCategory);
  }, [selectedCategory]);

  const handleToggleAvatarMenuTooltip = () => {
    setAvatarMenuTooltip((prev) => !prev);
  };

  const handleCloseAvatarMenuTooltip = () => {
    setAvatarMenuTooltip(false);
  };

  const handlePostNow = async () => {
    const res = await checkExistLessorApi();
    if (res === false) {
      addToast({
        type: "error",
        description: "Please update information to become a lessor",
      });
    } else {
      router.push("/create-product");
    }
  };

  return (
    <header className="px-4 mx-auto font-montserrat w-full">
      <div className="py-4 xl:px-10 md:pl-8 sm:pl-14 sm:flex sm:items-center sm:justify-between gap-x-16 w-full">
        <Link href="/">
          <figure className="flex items-center gap-x-2">
            <Image src={"/images/logo.svg"} alt="logo" width={50} height={50} />
            <span className="text-[#00939F]">-</span>
            <h1 className="text-black text-2xl font-semibold font-montserrat">
              Neighbor
            </h1>
          </figure>
        </Link>

        <section className="w-full h-10 flex-1 hidden sm:block">
          <Search />
        </section>

        <ul className="flex items-center gap-x-7">
          {userState.profile === null && (
            <li>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-x-1 p-2 hover:bg-[#ccc] cursor-pointer rounded-[24px] h-12 px-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="1.5rem"
                        height="1.5rem"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.6724 6.4678c.2734-.2812.6804-.4707 1.3493-.4707.3971 0 .705.0838.9529.2225.241.1348.4379.3311.5934.6193l.0033.006c.1394.2541.237.6185.237 1.1403 0 .7856-.2046 1.2451-.4796 1.5278l-.0048.005c-.2759.2876-.679.4764-1.334.4764-.3857 0-.6962-.082-.956-.2241-.2388-.1344-.4342-.3293-.5888-.6147-.1454-.275-.2419-.652-.2419-1.1704 0-.7902.2035-1.2442.4692-1.5174zm1.3493-2.4717c-1.0834 0-2.054.3262-2.7838 1.0766-.7376.7583-1.0358 1.781-1.0358 2.9125 0 .7656.1431 1.483.4773 2.112l.0031.0058c.3249.602.785 1.084 1.3777 1.4154l.0062.0035c.5874.323 1.2368.4736 1.9235.4736 1.0818 0 2.0484-.3333 2.7755-1.0896.7406-.7627 1.044-1.786 1.044-2.9207 0-.7629-.1421-1.4784-.482-2.0996-.3247-.6006-.7844-1.0815-1.376-1.4125-.5858-.3276-1.2388-.477-1.9297-.477zM6.4691 16.8582c.2983-.5803.7228-1.0273 1.29-1.3572.5582-.3191 1.2834-.5049 2.2209-.5049h4.04c.9375 0 1.6626.1858 2.2209.5049.5672.3299.9917.7769 1.29 1.3572.3031.5896.4691 1.2936.4691 2.1379v1h2v-1c0-1.1122-.2205-2.1384-.6904-3.0523a5.3218 5.3218 0 0 0-2.0722-2.1769c-.9279-.5315-2.0157-.7708-3.2174-.7708H9.98c-1.1145 0-2.2483.212-3.2225.7737-.8982.5215-1.5928 1.2515-2.0671 2.174C4.2205 16.8577 4 17.8839 4 18.9961v1h2v-1c0-.8443.166-1.5483.4691-2.1379z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="whitespace-nowrap font-montserrat text-[#00000] font-semibold">
                        Hello! Log in or sign up
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                    <span className="text-[#00000d] text-xs font-montserrat font-normal">
                      My profile
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          )}
          <li className="inline-flex">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <div className="flex items-center justify-center gap-x-1 cursor-pointer rounded-[24px] h-12 w-12 group">
                    <Link href="/cart">
                      <img src="/images/heart-svgrepo-com.svg" alt="heart-svgrepo-com" className="w-full h-full object-contain" />
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    Wish list
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>

          {userState.profile !== null && (
            <Fragment>
              <li>
                <div className="flex items-center justify-center gap-x-1 cursor-pointer rounded-[24px] h-12 group">
                  <Bell className="group-hover:text-purple-400" />
                </div>
              </li>
              <li>
                <Popover open={avatarMenuTooltip} onOpenChange={setAvatarMenuTooltip}>
                  <PopoverTrigger asChild>
                    <div onClick={handleToggleAvatarMenuTooltip}>
                      <figure className="rounded-full border border-zinc-300 overflow-hidden w-10 h-10 flex items-center justify-center hover:bg-gray-200">
                        <img
                          id="avatarButton"
                          className="w-9 h-9 rounded-full cursor-pointer"
                          src={userState?.profile?.cropAvatarLink !== "" ? userState?.profile?.cropAvatarLink : "/images/unknown.webp"}
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    align="center"
                    className="w-auto h-auto text-white rounded-md p-0"
                  >
                    <AvatarMenu onCloseTooltip={handleCloseAvatarMenuTooltip} />
                  </PopoverContent>
                </Popover>
              </li>
              <li>
                <button type="button" onClick={handlePostNow}>
                  <div className="flex items-center gap-x-2 px-5 py-2 rounded-md bg-[#00939f] hover:bg-[#15757e]">
                    <SquarePen className="w-5 h-5 text-white" />
                    <span className="text-[14px] font-semibold text-white">
                      POST
                    </span>
                  </div>
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </div>


      <div className="h-[40px] pl-10 flex items-center">
        <nav>
          <ul className="flex items-center justify-start gap-x-[60px] relative">
            {InitialNavItems.map((item, index) => {
              if (item.label === 'Contact Us') {
                return (
                  <li
                    key={index}
                    className="cursor-pointer relative"
                    onMouseEnter={() => handleCategoryHover(item)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <span className="text-xs text-black font-semibold font-montserrat">
                      {item.label}
                    </span>

                    <AnimatePresence>
                      {openLabel === item.label && (
                        <motion.div
                          className="absolute left-0 top-[calc(100%+10px)] bg-white shadow-lg w-[500px] p-4 z-50"
                          initial={{ opacity: 0, translateY: -10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Contact Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="border-r border-gray-200 pb-4">
                                <h4 className="text-sm text-gray-700 font-semibold">Email:</h4>
                                <p className="text-sm text-gray-600">example@example.com</p>
                              </div>
                              <div className=" border-gray-200 pb-4">
                                <h4 className="text-sm text-gray-700 font-semibold">Phone:</h4>
                                <p className="text-sm text-gray-600">+123456789</p>
                              </div>
                              <div className="border-r border-gray-200 pb-4">
                                <h4 className="text-sm text-gray-700 font-semibold">Address:</h4>
                                <p className="text-sm text-gray-600">123 Street, City, Country</p>
                              </div>
                              <div>
                                <h4 className="text-sm text-gray-700 font-semibold">Working Hours:</h4>
                                <p className="text-sm text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  className="cursor-pointer relative"
                  onMouseEnter={() => handleCategoryHover(item)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <span className="text-xs text-black font-semibold font-montserrat">
                    {item.label}
                  </span>

                  <AnimatePresence>
                    {openLabel === item.label && (
                      <motion.div
                        className="absolute left-0 top-[calc(100%+10px)] bg-white shadow-lg w-[1100px] h-[400px] z-50 flex"
                        initial={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-1/6 p-4 space-y-4">
                          {item.categories && item.categories.length > 0 ? (
                            <div className="space-y-2">
                              {item.categories.map((category, idx) => (
                                <div
                                  key={idx}
                                  className={`p-2 cursor-pointer ${selectedCategory === category.category ? 'underline' : ''} hover:bg-gray-100`}
                                  onClick={() => handleCategoryClick(category.category)}
                                >
                                  <span className="text-sm text-gray-700">{category.category}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">No categories available</span>
                          )}
                        </div>

                        <div className={`w-5/6 grid grid-cols-3 gap-2 p-4 max-h-[400px] overflow-y-auto`}>
                          {item.categories
                            .filter(
                              (category) =>
                                selectedCategory === category.category && category.subItems && category.subItems.length > 0
                            )
                            .map((category, idx) => (
                              <div key={idx} className="col-span-3">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                                <div className="grid grid-cols-4 gap-4 space-y-4">
                                  {category.subItems.map((subItem, subIdx) => (
                                    <div key={subIdx} className={`flex flex-row items-center hover:bg-gray-100 ${subIdx === 1 ? 'relative z-10' : ''}`}>
                                      <div className="w-24 h-20 mr-2 relative">
                                        <Image
                                          src={subItem.image}
                                          alt={subItem.name}
                                          layout="fill"
                                          objectFit="cover"
                                          className="shadow-md"
                                        />
                                      </div>
                                      <span className="text-xs text-gray-700">{subItem.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}

                          {item.categories.every(
                            (category) =>
                              selectedCategory !== category.category || !category.subItems || category.subItems.length === 0
                          ) && (
                              <span className="text-sm text-gray-500 col-span-3">No subitems available</span>
                            )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

    </header>
  );
}
