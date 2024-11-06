// const links = [
//   "Privacy policy",
//   "Responsible disclosure policy",
//   "Terms of use",
//   "Shanghai Administration for Industry and Commerce",
//   "沪公网安备 31010402001069号",
//   "沪ICP 备17055232 号-1",
//   "Cookies setting",
// ];

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-[50px] py-10 pb-[28px] bg-[#e1e1e1]">
      <div className="content">
        <div className="flex gap-[145px]">
          <div className="text w-[45%]">
            <a href="#">
              <figure className="flex items-center gap-x-2">
                <Image
                  src={"/images/logo.svg"}
                  alt="logo"
                  width={70}
                  height={70}
                />
                <span className="text-[#00939F]">-</span>
                <h1 className="text-black text-xl font-semibold font-montserrat">
                  Neighbor
                </h1>
              </figure>
            </a>
            <p className="mt-[30px] font-poppins font-normal text-[14px] leading-[1.86] text-[#000000]">
              Enjoy convenience and style with our car and furniture rental
              service – the simple solution for your travel needs and home decor
              dreams.
            </p>
            <div className="mt-[18px] flex items-center gap-[18px]">
              <figure className="bg-black px-3 py-2">
                <img
                  src="/images/facebook_icon.svg"
                  alt="facebook"
                  className=""
                />
              </figure>
              <figure className="bg-black px-3 py-2">
                <img src="/images/instagram_icon.svg" alt="instagram" />
              </figure>
              <figure className="bg-black px-3 py-2">
                <img src="/images/twitter_icon.svg" alt="twitter" />
              </figure>
            </div>
          </div>
          <div className="font-poppins grid grid-cols-3">
            <div className="w-max">
              <p className="font-semibold text-base text-[#000000]">Service</p>
              <ul className="mt-5">
                <li>
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      Rent Car
                    </span>
                  </Link>
                </li>
                <li className="mt-6">
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      Rent Furniture
                    </span>
                  </Link>
                </li>
                <li className="mt-6">
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      Features
                    </span>
                  </Link>
                </li>
                <li className="mt-6">
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      Delivery
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-max">
              <p className="font-semibold text-base text-[#000000]">Support</p>
              <ul className="mt-5">
                <li>
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      FAQ&apos;s
                    </span>
                  </Link>
                </li>
                <li className="mt-6">
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      Terms & Conditions
                    </span>
                  </Link>
                </li>
                <li className="mt-6">
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      Privacy Policy
                    </span>
                  </Link>
                </li>
                <li className="mt-6">
                  <Link href="#">
                    <span className="font-light text-base text-[#00000075] hover:text-[#000000]">
                      Contact Us
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[237px]">
              <p className="font-semibold text-base text-[#000000]">Company</p>
              <ul className="mt-5">
                <li>
                  <span className="font-medium text-base text-[#000000]">
                    Location:
                  </span>{" "}
                  <span className="text-[15px] text-[#00000075] hover:text-[#000000] font-light">
                    27 Division St, New York, NY 10002, USA
                  </span>
                </li>
                <li className="mt-4">
                  <span className="font-medium text-base text-[#000000]">
                    Email:
                  </span>{" "}
                  <span className="text-[15px] text-[#00000075] hover:text-[#000000] font-light">
                    email@gmail.com:
                  </span>
                </li>
                <li className="mt-4">
                  <span className="font-medium text-base text-[#000000]">
                    Phone:
                  </span>{" "}
                  <span className="text-[15px] text-[#00000075] hover:text-[#000000] font-light">
                    +84 123456789
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-[38px] w-full h-[1px] bg-[#59554b]"></div>
        <p className="mt-[28px] text-center font-normal text-base text-[#807d74]">
          Copyright ©2024 neighbor.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
