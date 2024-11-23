"use client";
import React, { useState, useEffect } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const productData = [
    { id: 1, image: "/images/product-01.png", name: "Apple Watch Series 7", category: "Electronics", price: 296, sold: 22, profit: 45, status: "pending" },
    { id: 2, image: "/images/product-02.png", name: "Macbook Pro M1", category: "Electronics", price: 546, sold: 12, profit: 125, status: "pending" },
    { id: 3, image: "/images/product-03.png", name: "Dell Inspiron 15", category: "Electronics", price: 443, sold: 64, profit: 247, status: "pending" },
    { id: 4, image: "/images/product-04.png", name: "HP Probook 450", category: "Electronics", price: 499, sold: 72, profit: 103, status: "approved" },
    { id: 5, image: "/images/product-04.png", name: "HP Probook 450", category: "Electronics", price: 499, sold: 72, profit: 103, status: "approved" },
    { id: 6, image: "/images/product-04.png", name: "HP Probook 450", category: "Electronics", price: 499, sold: 72, profit: 103, status: "rejected" },
    { id: 7, image: "/images/product-04.png", name: "HP Probook 450", category: "Electronics", price: 499, sold: 72, profit: 103, status: "rejected" },
];

const ManageProducts = () => {
    const [search, setSearch] = useState("");
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState(productData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [action, setAction] = useState("");

    useEffect(() => {
        const searchFilteredProducts = productData.filter((product) =>
            product.name.toLowerCase().includes(search.trim().toLowerCase())
        );
        setFilteredProducts(searchFilteredProducts);
    }, [search]);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    const approveProduct = (productId: number) => {
        setSelectedProduct(productId);
        setAction("approved");
        setIsModalOpen(true);
    };

    const rejectProduct = (productId: number) => {
        setSelectedProduct(productId);
        setAction("rejected");
        setIsModalOpen(true);
    };

    const handleConfirmAction = () => {
        const updatedProducts = [...filteredProducts];
        const productIndex = updatedProducts.findIndex((product) => product.id === selectedProduct);
        if (productIndex !== -1) {
            updatedProducts[productIndex].status = action; 
        }
        setFilteredProducts(updatedProducts); 
        setIsModalOpen(false); 
    };
    


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
                                setFilteredProducts(productData);
                            } else {
                                setFilteredProducts(productData.filter((product) => product.status === status));
                            }
                        }}
                        className="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
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

            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <thead>
                        <tr className="border-b bg-gray-300">
                            <th className="text-left p-3 px-5"></th>
                            <th className="text-left p-3 px-5">Product Name</th>
                            <th className="text-left p-3 px-5">Category</th>
                            <th className="text-left p-3 px-5">Price</th>
                            <th className="text-left p-3 px-5">Sold</th>
                            <th className="text-left p-3 px-5">Profit</th>
                            <th className="text-left p-3 px-5">Status</th>
                            <th className="text-left p-3 px-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <tr key={product.id} className="border-b hover:bg-orange-100">
                                    <td className="p-3 px-5 flex items-center">
                                        <Image
                                            src={product.image}
                                            width={60}
                                            height={50}
                                            alt="Product"
                                            className="w-12 h-12 rounded-md"
                                        />
                                    </td>
                                    <td className="p-3 px-5">{product.name}</td>
                                    <td className="p-3 px-5">{product.category}</td>
                                    <td className="p-3 px-5">${product.price}</td>
                                    <td className="p-3 px-5">{product.sold}</td>
                                    <td className="p-3 px-5">${product.profit}</td>
                                    <td className="p-3 px-5">
                                        <span
                                            className={`px-2 py-1 text-sm rounded 
                                                    ${product.status === "approved" ? "bg-green-200 text-green-800" :
                                                    product.status === "rejected" ? "bg-red-200 text-red-800" :
                                                        "bg-yellow-200 text-yellow-800"}`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>

                                    <td className="p-3 px-5 flex space-x-2 mb-7">
                                        {product.status === "pending" && (
                                            <>
                                                <button
                                                    className=" text-green-500 border-green-500 border py-1 px-2 rounded-full focus:outline-none focus:shadow-outline w-24 bg-transparent font-semibold"
                                                    onClick={() => approveProduct(product.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="text-red-500 border-red-500 border py-1 px-2 rounded-full focus:outline-none focus:shadow-outline w-24 bg-transparent font-semibold"
                                                    onClick={() => rejectProduct(product.id)}
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

            <div className="flex justify-center items-center mb-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) {
                                        changePage(currentPage - 1);
                                    }
                                }}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, pageIndex) => (
                            <PaginationItem key={pageIndex}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === pageIndex + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        changePage(pageIndex + 1);
                                    }}
                                >
                                    {pageIndex + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) {
                                        changePage(currentPage + 1);
                                    }
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to {action} this product?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmAction}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageProducts;
