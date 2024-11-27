"use client";

import useDebounce from "@/hooks/use-debounce";
import useGetProducts from "@/hooks/use-get-products";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import TableProducts from "@/app/admin/manage-products/components/table-products";
import PaginatedComponent from "@/components/paginated";
import { confirmStatus } from "@/const/products";

function AdminManageProduct() {
  const { getProductsApi, isPending } = useGetProducts();
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 600);

  const [products, setProducts] = useState<API.TGetProducts | null>(null);
  const [filteredProducts, setFilteredProducts] = useState("all");

  const handleFetchProducts = async () => {
    const res = await getProductsApi({
      pageIndex: currentPage,
      pageSize: productsPerPage,
      name: debouncedSearchTerm,
      confirmStatus: filteredProducts !== "all" ? filteredProducts : null,
    });
    if (res) setProducts(res.value.data || null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleFetchProducts();
  }, [debouncedSearchTerm, currentPage, filteredProducts]);

  return (
    <div className="text-gray-900 font-open_sans">
      <h1 className="text-xl mr-4 p-4 font-semibold">Manage Products</h1>
      <div className="p-4 flex justify-between items-center">
        <div className="relative flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="p-2 pr-10 border border-gray-400 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <CiSearch className="absolute right-3 text-xl text-gray-500" />
        </div>
        <div>
          <label htmlFor="statusFilter" className="mr-2">
            Filter by status:
          </label>
          <select
            id="statusFilter"
            onChange={(e) => {
              const status = e.target.value;
              if (status === "all") {
                setFilteredProducts("all");
              } else {
                setFilteredProducts(e.target.value);
              }
            }}
            className="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All</option>
            <option value={confirmStatus.Pending}>Pending</option>
            <option value={confirmStatus.Approved}>Approved</option>
            <option value={confirmStatus.Rejected}>Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="productsPerPage" className="mr-2">
            Products per page:
          </label>
          <select
            id="productsPerPage"
            value={productsPerPage}
            onChange={(e) => {
              setProductsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {[5, 10, 15, 20].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <TableProducts products={products?.items || []} />
      </div>
      <div className="text-center">
        <PaginatedComponent
          totalPages={products?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AdminManageProduct;
