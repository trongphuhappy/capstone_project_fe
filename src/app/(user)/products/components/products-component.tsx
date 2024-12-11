"use client";

import CartProductItem from "@/components/card-product-item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filters } from "@/const/products";
import { useEffect, useState } from "react";
import PaginatedComponent from "@/components/paginated";
import { useSearchParams, useRouter } from "next/navigation";
import useGetProducts from "@/hooks/use-get-products";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import useGetCategories from "@/hooks/use-get-categories";
import useSearchDialog from "@/hooks/use-search-dialog";

export default function ProductsComponent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryState = useAppSelector((state) => state.categorySlice);

  const { getCategoriesApi, isPending } = useGetCategories();

  const [searchName, setSearchName] = useState<string | null>(
    searchParams.get("searchName")
  );

  const [category, setCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [location, setLocation] = useState<string | null>(
    searchParams.get("location")
  );
  const [sortField, setSortField] = useState<string | null>(
    searchParams.get("sortField")
  );
  const [order, setOrder] = useState<string | null>(searchParams.get("order"));

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [categories, setCategories] = useState<API.Category[]>([]);

  const { getProductsApi } = useGetProducts();
  const { onOpenSearchDialog } = useSearchDialog();
  const [products, setProducts] = useState<API.TGetProducts | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleFetchProducts(page);
  };

  const handleFetchCategory = async () => {
    const res = await getCategoriesApi({ pageIndex: 1, pageSize: 100 });
    if (res?.value?.data.items) {
      setCategories(res?.value?.data?.items);
    }
  };

  const handleFetchProducts = async (pageIndex: number) => {
    const res = await getProductsApi({
      name: searchName,
      pageIndex: pageIndex,
      pageSize: 15,
      categoryId: category,
    });
    if (res) setProducts(res.value.data);
  };

  const updateQueryParams = () => {
    const queryParams: Record<string, string | null> = {
      category,
      location,
      sortField,
      order,
      searchName,
      page: currentPage.toString(),
    };

    const cleanQueryParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => [key, value as string])
    );

    router.push(
      `/products?${new URLSearchParams(cleanQueryParams).toString()}`
    );
  };

  useEffect(() => {
    if (currentPage !== 1) {
      handleFetchProducts(1);
      setCurrentPage(1);
    } else {
      handleFetchProducts(currentPage);
    }
  }, [category, location, sortField, order]);

  useEffect(() => {
    updateQueryParams(); // Update URL on initial load or when state changes
  }, [category, location, sortField, order, currentPage, searchName]);

  useEffect(() => {
    if (categories?.length === 0) {
      // Fetch categories
      handleFetchCategory();
    }
  }, []);

  return (
    <div className="my-3 py-5 px-[50px] font-montserrat">
      <div>
        <div className="flex items-baseline gap-x-5">
          {searchName !== null && searchName !== "" && (
            <h3 className="font-semibold text-3xl">{searchName}</h3>
          )}
          <span className="font-normal text-base">
            {products?.totalCount} product
          </span>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b-[1px] border-[#e5e5e5]">
          <div
              className="w-[180px] rounded-3xl bg-[#f5f5f5] border-none hover:bg-[#d5d5d5] text-[#11111] text-xs font-bold"
              onClick={onOpenSearchDialog}
            >
              <span className="inline-block font-montserrat px-3 py-2 select-none">
                Search
              </span>
            </div>
            <Select
              onValueChange={(value) => {
                if (value === "-1") {
                  setCategory(null);
                  return;
                }
                const index = Number.parseInt(value);
                setCategory(categories[index].id.toString());
              }}
            >
              <SelectTrigger className="w-[180px] rounded-3xl bg-[#f5f5f5] border-none hover:bg-[#d5d5d5] text-[#11111] text-xs font-bold">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    value={"-1"}
                    className="font-montserrat py-2 select-none"
                  >
                    All
                  </SelectItem>
                  {categories?.map((item: API.Category, index: number) => (
                    <SelectItem
                      key={index}
                      value={index.toString()}
                      className="font-montserrat py-2 select-none"
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {filters?.map((filter, index) => (
              <Select
                key={index}
                onValueChange={(value) => {
                  if (filter.title === "Categories") {
                    setCategory(value);
                  }
                  if (filter.title === "Locations") {
                    setLocation(value);
                  }
                  if (filter.title === "Sort by") {
                    setSortField(value);
                  }
                  if (filter.title === "Order") {
                    setOrder(value);
                  }
                }}
              >
                <SelectTrigger className="w-[180px] rounded-3xl bg-[#f5f5f5] border-none hover:bg-[#d5d5d5] text-[#11111] text-xs font-bold">
                  <SelectValue placeholder={filter.title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filter.sub?.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.id}
                        className="font-montserrat py-2 select-none"
                      >
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ))}
          </div>

          <div className="py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-4 ml-10 md:ml-14 max-[360px]:ml-3">
              {products?.items?.map((product: API.TProduct, index: number) => {
                return (
                  <div
                    key={index}
                    className="mr-0 max-[360px]:mr-6"
                  >
                    <CartProductItem product={product} />
                  </div>
                );
              })}
            </div>
            {products && products?.totalCount > 0 && (
              <div className="mt-5">
                <PaginatedComponent
                  totalPages={products?.totalPages || 1}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            {products?.totalCount === 0 && (
              <h3 className="text-xl">No result</h3>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
