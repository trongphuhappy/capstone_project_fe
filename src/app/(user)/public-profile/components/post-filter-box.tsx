import CardProductItem from "@/components/card-product-item";
import PaginatedComponent from "@/components/paginated";
import useGetProducts from "@/hooks/use-get-products";
import { useAppSelector } from "@/stores/store";
import { Plus, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface IPostFilterBoxProps {
  accountId: string;
}

export default function PostFilterBox({ accountId }: IPostFilterBoxProps) {
  const { getProductsApi, isPending } = useGetProducts();

  const [products, setProducts] = useState<API.TGetProducts | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleFetchProducts(page);
  };

  const handleFetchProducts = async (pageIndex: number) => {
    const res = await getProductsApi({
      accountLessorId: accountId,
      pageIndex: pageIndex,
      pageSize: 10,
    });
    if (res) setProducts(res.value.data || null);
  };

  useEffect(() => {
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
            // onClick={openUpdateBiography}
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
        {products !== null ? (
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
        ) : (
          <div className="flex items-center gap-x-4">
            <p className="text-xl">You don't have any products yet</p>
            <button
              type="button"
              className="px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#00939f] group shadow-header-shadown"
            >
              <div className="flex items-center gap-x-3">
                <i>
                  <Plus className="text-black w-5 h-5 group-hover:text-white" />
                </i>
                <span className="text-base font-medium group-hover:text-white">
                  Post now
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
