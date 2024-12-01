import useDebounce from "@/hooks/use-debounce";
import useGetProducts from "@/hooks/use-get-products";
// import useGetProductsFilter from "@/hooks/useGetProductsFilter";
import { formatCurrencyVND } from "@/utils/format-currency";
import {
  productCategories,
  productLocale,
} from "@/utils/locales/en-US/product";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

interface SearchComponentProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchComponent({
  open,
  onClose,
}: SearchComponentProps) {
  const [searchName, setSearchName] = useState("");
  const [dots, setDots] = useState(0);
  const debouncedSearchTerm = useDebounce(searchName, 600);

  const { getProductsApi, isPending } = useGetProducts();

  const [products, setProducts] = useState<API.TProduct[]>([]);

  const handleCloseSearch = () => {
    onClose();
    setProducts([]);
  };

  const handleResetSearchName = () => {
    setSearchName("");
  };

  const handleFetchDataSearch = async () => {
    const res = await getProductsApi({
      name: debouncedSearchTerm,
      pageIndex: 1,
      pageSize: 3,
      confirmStatus: 1,
      statusType: 1,
    });
    if (res) setProducts(res?.value?.data?.items);
  };

  const nextPageProducts = () => {
    handleCloseSearch();
    window.location.href = `/products?searchName=${searchName}`;
  };

  useEffect(() => {
    handleFetchDataSearch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (isPending) {
      const interval = setInterval(() => {
        setDots((prev) => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots(0);
    }
  }, [isPending]);

  const renderProducts = () => {
    return products?.map((product: API.TProduct, index: number) => {
      return (
        <Link key={index} href={`/product/${product.id}`} onClick={onClose}>
          <div className="py-2 px-2 flex items-start gap-x-4 hover:bg-slate-100 cursor-pointer">
            <img
              src={product.productImagesUrl[0]}
              alt={product.name}
              className="w-[100px] h-[100px] border"
            />
            <div className="flex flex-col gap-y-2">
              <h3 className="text-base">Name: {product.name}</h3>
              <p className="font-montserrat text-[15px]">
                Type: {product?.category?.categoryName}
              </p>
              <div className="flex items-baseline gap-x-3">
                <span className="text-base font-montserrat">Price:</span>
                <p className="text-2xl text-black font-semibold">
                  {product && formatCurrencyVND(product?.price)} /{" "}
                  {product?.maximumRentDays} days
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div
      className={`fixed h-[100vh] top-0 w-full right-0 z-50 font-montserrat ${
        open === false && "hidden"
      }`}
    >
      <div className="bg-white" style={{ height: "75%" }}>
        <div className="px-[100px] pt-[80px]">
          <div className="flex items-start gap-x-16">
            <button
              type="button"
              className="flex items-center justify-center rounded-full hover:bg-[#b9b8b8]"
              onClick={handleCloseSearch}
            >
              <X />
            </button>
            <div className="w-full">
              <div className="w-full relative">
                <input
                  type="text"
                  className="w-full text-base font-montserrat border-t-none border-b-[1px] outline-none pb-8
                focus:border-b-blue-500
                "
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="toyota"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      nextPageProducts();
                    }
                  }}
                  maxLength={50}
                />
                <div className="absolute top-0 right-0">
                  <div className="flex items-center gap-x-3">
                    {searchName !== "" && (
                      <button
                        type="button"
                        onClick={handleResetSearchName}
                        className="flex items-center justify-center rounded-full hover:bg-[#b9b8b8]"
                      >
                        <X className="opacity-70" />
                      </button>
                    )}
                    <button className="flex items-center justify-center rounded-full hover:bg-[#b9b8b8]">
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                {isPending === false ? (
                  <Fragment>
                    {products && products?.length > 0 ? (
                      debouncedSearchTerm !== "" ? (
                        <h3 className="text-base font-light">
                          3 results for {debouncedSearchTerm}
                        </h3>
                      ) : (
                        <h3 className="text-base font-light">3 results</h3>
                      )
                    ) : (
                      <h3 className="text-base font-light">No results</h3>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <h3 className="text-base font-light">
                      Đang tìm kiếm{".".repeat(dots)}
                    </h3>
                  </Fragment>
                )}
                <div className="py-3">{renderProducts()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[30vh] bg-black opacity-20"
        onClick={handleCloseSearch}
      ></div>
    </div>
  );
}
