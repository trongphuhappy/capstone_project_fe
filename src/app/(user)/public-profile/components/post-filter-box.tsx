import CardProductItem from "@/components/card-product-item";
import PaginatedComponent from "@/components/paginated";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { confirmStatus } from "@/const/products";
import useGetCategories from "@/hooks/use-get-categories";
import useGetProducts from "@/hooks/use-get-products";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

interface IPostFilterBoxProps {
  accountId: string;
}

export default function PostFilterBox({ accountId }: IPostFilterBoxProps) {
  const { getProductsApi, isPending } = useGetProducts();
  const { getCategoriesApi, isPending: isPendingCategories } =
    useGetCategories();

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [products, setProducts] = useState<API.TGetProducts | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<API.Category[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<confirmStatus | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleFetchProducts(page);
  };

  const handleFetchProducts = async (pageIndex: number) => {
    const res = await getProductsApi({
      accountUserId: accountId,
      pageIndex: pageIndex,
      pageSize: 10,
      categoryId: category,
      confirmStatus: statusType ?? null,
    });
    if (res) setProducts(res.value.data || null);
  };

  const handleFetchCategory = async () => {
    const res = await getCategoriesApi({ pageIndex: 1, pageSize: 100 });
    if (res?.value?.data.items) {
      setCategories(res?.value?.data?.items);
    }
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleFilterPost = () => {
    handleCloseFilter();
    handleFetchProducts(1);
  };

  useEffect(() => {
    handleFetchCategory();
    if (currentPage !== 1) {
      handleFetchProducts(1);
      setCurrentPage(1);
    } else {
      handleFetchProducts(currentPage);
    }
  }, []);

  const renderProducts = () => {
    return products?.items?.map((product, index) => {
      return <CardProductItem key={index} product={product} />;
    });
  };

  return (
    <div className="w-full min-h-[300px] p-[15px] rounded-lg shadow-box-shadown break-words">
      <div className="flex items-center justify-between pb-3 border-b-2">
        <h3 className="text-[18px] font-semibold">Post</h3>
        <div>
          <button
            type="button"
            onClick={handleOpenFilter}
            className="w-full px-3 py-[6px] bg-[#e2e5e9] rounded-sm hover:bg-[#d1d4d7] group shadow-header-shadown"
          >
            <div className="flex gap-x-2 items-center">
              <i>
                <SlidersHorizontal className="text-black w-5 h-5" />
              </i>
              <span className="text-center text-[15px] font-medium text-black">
                Filter
              </span>
            </div>
          </button>
        </div>
      </div>
      <div className="my-2">
        <div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-7">
            {renderProducts()}
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
        </div>
      </div>
      <Dialog open={openFilter} onOpenChange={handleCloseFilter}>
        <DialogContent className="sm:max-w-[600px] px-0 pt-2 pb-7 my-0 overflow-y-auto font-montserrat">
          <DialogHeader>
            <DialogTitle className="px-5">
              <div className="pt-2 flex items-center justify-between">
                <h2 className="text-xl text-center">Filter post</h2>
                <div className="flex justify-end">
                  <button
                    className="w-8 h-8 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center group"
                    onClick={handleCloseFilter}
                  >
                    <i>
                      <X
                        strokeWidth={2.75}
                        className="text-gray-500 group-hover:text-gray-950 w-5 h-5"
                      />
                    </i>
                  </button>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="pt-3 px-5 border-t">
            <h3 className="text-[17px] text-[#111111] font-semibold">
              Use filters to search for posts
            </h3>
            <div className="mt-3 flex flex-col gap-y-4">
              <div className="flex">
                <h4 className="text-base w-[150px]">Category: </h4>
                <div>
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
                        {categories?.map(
                          (item: API.Category, index: number) => (
                            <SelectItem
                              key={index}
                              value={index.toString()}
                              className="font-montserrat py-2 select-none"
                            >
                              {item.name}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex">
                <h4 className="text-base w-[150px]">Status : </h4>
                <div>
                  <Select
                    onValueChange={(value) => {
                      if (value === "-2") {
                        setStatusType(null);
                        return;
                      }
                      if (value === "1") setStatusType(confirmStatus.Approved);
                      if (value === "0") setStatusType(confirmStatus.Pending);
                      if (value === "-1") setStatusType(confirmStatus.Rejected);
                    }}
                  >
                    <SelectTrigger className="w-[180px] rounded-3xl bg-[#f5f5f5] border-none hover:bg-[#d5d5d5] text-[#11111] text-xs font-bold">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          value={"-2"}
                          className="font-montserrat py-2 select-none"
                        >
                          All
                        </SelectItem>
                        <SelectItem
                          value={"0"}
                          className="font-montserrat py-2 select-none"
                        >
                          Waiting for approval
                        </SelectItem>
                        <SelectItem
                          value={"1"}
                          className="font-montserrat py-2 select-none"
                        >
                          Approved
                        </SelectItem>
                        <SelectItem
                          value={"-1"}
                          className="font-montserrat py-2 select-none"
                        >
                          Rejected
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-3 pr-6 text-right">
            <div className="ml-auto mr-0">
              <button
                type="button"
                onClick={handleCloseFilter}
                className="mr-2 px-3 py-2 bg-[#e2e5e9] rounded-md hover:bg-[#00939f] group shadow-header-shadown"
              >
                <div className="flex items-center gap-x-3">
                  <span className="text-[14px] font-medium group-hover:text-white">
                    Cancel
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={handleFilterPost}
                className="px-3 py-2 bg-[#e2e5e9] rounded-md hover:bg-[#00939f] group shadow-header-shadown"
              >
                <div className="flex items-center gap-x-3">
                  <span className="text-[14px] font-medium group-hover:text-white">
                    Filter
                  </span>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
