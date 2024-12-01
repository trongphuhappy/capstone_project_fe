"use client";

import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CiSearch } from "react-icons/ci";
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
import useGetProducts from "@/hooks/use-get-products";

export default function ManageUser() {
  const [blockedUsers, setBlockedUsers] = useState<boolean[]>([]);
  const [search, setSearch] = useState("");
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    index: number;
  } | null>(null);
  const [banReason, setBanReason] = useState("");

  // fake user
  const fakeUsers = Array.from({ length: 20 }, (_, index) => ({
    id: `user_${index + 1}`,
    firstName: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    fullAvatarUrl: "https://via.placeholder.com/150",
  }));

  useEffect(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const pageUsers = fakeUsers.slice(startIndex, endIndex);

    setUsers(pageUsers);
    setTotalUsers(fakeUsers.length);
    setBlockedUsers(Array(pageUsers.length).fill(false));
  }, [currentPage, usersPerPage]);

  const openBanModal = (index: number, userId: string) => {
    setSelectedUser({ id: userId, index });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setBanReason("");
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="text-gray-900 font-open_sans">
      <h1 className="text-xl mr-4 p-4 font-semibold">Manage User</h1>
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
          <label htmlFor="usersPerPage" className="mr-2">
            Users per page:
          </label>
          <select
            id="usersPerPage"
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
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
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-right p-3 px-12">Feature</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className={`border-b hover:bg-orange-100`}>
                  <td className="p-3 px-5 flex items-center">
                    <img
                      src={user.fullAvatarUrl || "default_avatar.png"}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  </td>
                  <td className="p-3 px-5">{user.firstName}</td>
                  <td className="p-3 px-5">{user.email}</td>
                  <td className="p-3 px-7 text-right">
                    <button
                      type="button"
                      className={`text-base ${
                        blockedUsers[index]
                          ? "text-green-500 border-green-500"
                          : "text-red-500 border-red-500"
                      } border py-1 px-2 rounded-full focus:outline-none focus:shadow-outline w-24 bg-transparent font-semibold`}
                      onClick={() => openBanModal(index, user.id)}
                    >
                      {blockedUsers[index] ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No users found.
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
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {blockedUsers[selectedUser?.index ?? -1]
                ? "Unban User"
                : "Ban User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {blockedUsers[selectedUser?.index ?? -1]
                ? "Are you sure you want to unban this user?"
                : "Are you sure you want to ban this user?"}
            </AlertDialogDescription>

            {!blockedUsers[selectedUser?.index ?? -1] && (
              <div className="mt-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Ban Reason
                </label>
                <input
                  type="text"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              {blockedUsers[selectedUser?.index ?? -1]
                ? "Confirm Unban"
                : "Confirm Ban"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
