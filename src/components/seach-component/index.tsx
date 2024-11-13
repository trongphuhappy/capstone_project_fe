import useDebounce from "@/hooks/use-debounce";
import useGetProductsFilter from "@/hooks/useGetProductsFilter";
import { formatCurrencyVND } from "@/utils/format-currency";
import { productCategories } from "@/utils/locales/en-US/product";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SearchComponentProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchComponent({
  open,
  onClose,
}: SearchComponentProps) {
  const [searchName, setSearchName] = useState("");
  const debouncedSearchTerm = useDebounce(searchName, 600);

  const { products, handleGetProductsFilter } = useGetProductsFilter();

  const handleCloseSearch = () => {
    onClose();
  };

  const handleResetSearchName = () => {
    setSearchName("");
  };

  const handleFetchDataSearch = async () => {
    await handleGetProductsFilter({
      page: 1,
      take: 3,
      name: debouncedSearchTerm,
    });
  };

  const nextPageProducts = () => {
    onClose();
    window.location.href = `/products?searchName=${searchName}`;
  };

  useEffect(() => {
    handleFetchDataSearch();
  }, [debouncedSearchTerm]);

  const renderProducts = () => {
    return products?.data?.map((product: API.IProductCard, index: number) => {
      return (
        <Link key={index} href={`/product/${product.id}`}>
          <div className="py-2 px-2 flex items-start gap-x-4 hover:bg-slate-100 cursor-pointer">
            <img
              src={product.image}
              alt={product.name}
              className="w-[100px] h-[100px] border"
            />
            <div className="flex flex-col gap-y-2">
              <h3 className="text-base">Name: {product.name}</h3>
              <p className="font-montserrat text-[15px]">
                Type: {productCategories[product?.category?.name]}
              </p>
              <p className="text-base">
                Price: {formatCurrencyVND(product.price)}
              </p>
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
                {products?.data && products?.data?.length > 0 ? (
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
