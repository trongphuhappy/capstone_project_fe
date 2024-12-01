import { confirmStatus } from "@/const/products";
import useCensorProductDialog from "@/hooks/use-censor-product-dialog";
import { formatCurrencyVND } from "@/utils/format-currency";

interface TableProductsProps {
  products: API.TProduct[];
}

export default function TableProducts({ products }: TableProductsProps) {
  const { onOpenCensorProductDialog, onCloseCensorProductDialog } =
    useCensorProductDialog();

  const handleApprove = (product: API.TProduct) => {
    onOpenCensorProductDialog(confirmStatus.Approved, product);
  };

  const handleReject = (product: API.TProduct) => {
    onOpenCensorProductDialog(confirmStatus.Rejected, product);
  };

  return (
    <div className="px-3 py-4 flex justify-center">
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b bg-gray-300">
            <th className="text-left p-3 px-5"></th>
            <th className="text-left p-3 px-5">Product Name</th>
            <th className="text-left p-3 px-5">Category</th>
            <th className="text-left p-3 px-5">Purchase price</th>
            <th className="text-left p-3 px-5">Rent price</th>
            <th className="text-left p-3 px-5">Rent days</th>
            <th className="text-left p-3 px-5">Status</th>
            <th className="text-left p-3 px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products?.map((product) => (
              <tr key={product.id} className="border-b hover:bg-orange-100">
                <td className="p-3 px-5 flex items-center">
                  <img
                    src={product?.productImagesUrl[0] || "/no-image.png"}
                    width={60}
                    height={50}
                    alt="Product"
                    className="w-12 h-12 rounded-md"
                  />
                </td>
                <td className="p-3 px-5">{product.name}</td>
                <td className="p-3 px-5">{product?.category?.categoryName}</td>
                <td className="p-3 px-5">{formatCurrencyVND(product.value)}</td>
                <td className="p-3 px-5">{formatCurrencyVND(product.price)}</td>
                <td className="p-3 px-5">{product.maximumRentDays}</td>
                <td className="p-3 px-5">
                  <span
                    className={`px-2 py-1 text-sm rounded 
                                        ${
                                          product?.confirmStatus ===
                                          confirmStatus.Pending
                                            ? "bg-green-200 text-green-800"
                                            : product.confirmStatus ===
                                              confirmStatus.Rejected
                                            ? "bg-red-200 text-red-800"
                                            : "bg-yellow-200 text-yellow-800"
                                        }`}
                  >
                    {confirmStatus[product.confirmStatus]}
                  </span>
                </td>

                <td className="p-3 px-5 flex space-x-2 mb-7">
                  {product.confirmStatus === confirmStatus.Pending && (
                    <>
                      <button
                        className=" text-green-500 border-green-500 border py-1 px-2 rounded-full focus:outline-none focus:shadow-outline w-24 bg-transparent font-semibold"
                        onClick={() => handleApprove(product)}
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-500 border-red-500 border py-1 px-2 rounded-full focus:outline-none focus:shadow-outline w-24 bg-transparent font-semibold"
                        onClick={() => handleReject(product)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
