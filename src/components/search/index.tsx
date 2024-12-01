"use client";

import useSearchDialog from "@/hooks/use-search-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ArraySearchValue = ["Furniture rental", "Car rental"];

export default function Search() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { onOpenSearchDialog } = useSearchDialog();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ArraySearchValue.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full" onClick={onOpenSearchDialog}>
      <div className="w-full h-full relative z-30 overflow-hidden">
        <div className="sm:flex items-center justify-center w-20 lg:w-full md:w-48 sm:w-[50px] h-full cursor-pointer bg-[#f5f5f5] rounded-full"></div>
        <input
          type="text"
          id="search"
          readOnly
          className="pl-[52px] h-full bg-[#f5f5f5] border border-solid border-[#f5f5f5] rounded-[24px] w-full text-[13px] font-bold outline-none cursor-pointer z-20"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="1.5rem"
          height="1.5rem"
          className="sm:absolute md:left-6 sm:left-3 sm:top-1/2 sm:-translate-y-1/2 pointer-events-none"
        >
          <path
            fillRule="evenodd"
            d="M13.9804 15.3946c-1.0361.7502-2.3099 1.1925-3.6869 1.1925C6.8177 16.5871 4 13.7694 4 10.2935 4 6.8177 6.8177 4 10.2935 4c3.4759 0 6.2936 2.8177 6.2936 6.2935 0 1.377-.4423 2.6508-1.1925 3.6869l4.6016 4.6016-1.4142 1.4142-4.6016-4.6016zm.6067-5.1011c0 2.3713-1.9223 4.2936-4.2936 4.2936C7.9223 14.5871 6 12.6648 6 10.2935 6 7.9223 7.9223 6 10.2935 6c2.3713 0 4.2936 1.9223 4.2936 4.2935z"
            clipRule="evenodd"
          ></path>
        </svg>

        <div className="absolute pl-[55px] top-[11px] left-0 right-0 h-10 z-10">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              className="text-[14px] text-gray-700 absolute top-0 w-full z-10"
            >
              {ArraySearchValue[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
