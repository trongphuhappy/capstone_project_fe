import { Plus, SlidersHorizontal } from "lucide-react";

export default function PostFilterBox() {
  const products = [1,2];

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
          <div>123</div>
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
