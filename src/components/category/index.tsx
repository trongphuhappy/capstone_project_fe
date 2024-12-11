import { useEffect, useState } from "react";
import styles from "@/components/category/category.module.css";
import { motion } from "framer-motion";
import useGetCategories from "@/hooks/use-get-categories";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { addCategory } from "@/stores/category-slice";
import { Categories } from "@/const/category";
import Link from "next/link";

export default function Category() {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((state) => state.categorySlice);
  const { getCategoriesApi } = useGetCategories();

  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const [category, setCategory] = useState<string>("");

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const target = event.currentTarget.getBoundingClientRect();
    setSliderStyle({
      width: target.width,
      left:
        target.left -
        event.currentTarget.offsetParent!.getBoundingClientRect().left,
    });
    setCategory(Categories[index].value);
  };

  const handleMouseLeave = () => {
    setSliderStyle({ width: 0, left: 0 });
  };

  const handleFetchCategory = async () => {
    const res = await getCategoriesApi({ pageIndex: 1, pageSize: 100 });
    if (res?.value?.data.items) {
      dispatch(addCategory(res.value.data.items));
    }
  };

  useEffect(() => {
    if (categoryState?.furniture?.length === 0) {
      handleFetchCategory();
    }
  }, []);

  const renderFurnitureAndCarContent = (
    index: number,
    category: API.Category
  ) => {
    return (
      <a key={index} href={`/products?category=${category.id}&page=1`}>
        <div className="cursor-pointer flex items-center gap-x-3 group">
          <figure className="w-[110px] h-[70px]">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </figure>
          <span className="font-semibold text-base group-hover:underline">
            {category.name}
          </span>
        </div>
      </a>
    );
  };

  const renderCategoriesContent = () => {
    if (category === "Furniture") {
      return categoryState.furniture?.map(
        (item: API.Category, index: number) => {
          return renderFurnitureAndCarContent(index, item);
        }
      );
    } else if (category === "Car") {
      return categoryState.car?.map((item: API.Category, index: number) => {
        return renderFurnitureAndCarContent(index, item);
      });
    }
  };

  return (
    <div className={styles.categoryMenu} onMouseLeave={handleMouseLeave}>
      <div className={styles.categories}>
        {Categories.map((category, index) => (
          <div
            key={index}
            className={styles.category}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
          >
            {category.value}
          </div>
        ))}
        <motion.div
          className={styles.slider}
          animate={sliderStyle}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 20,
            duration: 0.3,
          }}
        />
      </div>

      {sliderStyle.width !== 0 && (
        <div
          className={`${styles.boxCategoryContent} max-h-[500px] overflow-y-auto`}
        >
          <div className="w-[80%] pb-4 grid grid-cols-4 gap-x-2 gap-y-6">
            {renderCategoriesContent()}
          </div>
        </div>
      )}
    </div>
  );
}
