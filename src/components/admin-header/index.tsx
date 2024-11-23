"use client";
import React, { useState, useEffect, useRef } from "react";
import { VscBellDot } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";
import Link from "next/link";
import useLogout from "@/hooks/use-logout";

import { AlignJustify } from "lucide-react";
import { closeSidebar, openSidebar } from "@/stores/difference-slice";

export default function AdminHeader() {
    const userState = useAppSelector((state) => state.userSlice);

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const notificationRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const { addToast } = useToast();
    const { handleLogout, isPending } = useLogout();
    const dispatch = useAppDispatch();
    const staffState = useAppSelector((state) => state.differenceSlice.staff);

    const handleToggleSidebar = () => {
        return staffState.openSidebar
            ? dispatch(closeSidebar())
            : dispatch(openSidebar());
    };

    return (
        <header className="bg-white py-4 ">
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={handleToggleSidebar}>
                        <span>
                            <AlignJustify />
                        </span>
                    </button>
                </div>
                <div className="flex items-center space-x-4 relative">
                    <div className="relative" ref={notificationRef}>
                        <VscBellDot
                            className="text-2xl cursor-pointer"
                            onClick={() => setNotificationOpen(!notificationOpen)}
                        />
                        {notificationOpen && (
                            <div className="z-30 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white font-bold">
                                    Notifications
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        New user registered.
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Payment received.
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Server update completed.
                                    </li>
                                </ul>
                                <div className="px-4 py-2 text-center text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                                    View all
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <img
                            id="avatarButton"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-10 h-10 rounded-full cursor-pointer select-none"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" // Thay thế bằng đường dẫn avatar của bạn
                            alt="User dropdown"
                        />

                        {dropdownOpen && (
                            <div
                                id="userDropdown"
                                className="z-30 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>Admin</div>
                                    <div className="font-medium truncate">admin@pawfund.com</div>
                                </div>
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="avatarButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Earnings
                                        </a>
                                    </li>
                                </ul>
                                <div className="py-1" onClick={handleLogout}>
                                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Sign out
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
            </div>
        </header>
    );
}
