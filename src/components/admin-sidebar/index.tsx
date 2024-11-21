"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BsGrid,
  BsCalendar,
  BsPerson,
  BsTable,
  BsGear,
  BsChevronDown,
  BsBoxArrowInRight,
} from "react-icons/bs";
import { AiOutlineForm, AiOutlinePieChart } from "react-icons/ai";
import { RiHome2Line } from "react-icons/ri";
import { useAppSelector } from "@/stores/store";
import { BsCoin } from "react-icons/bs";
import { MdInventory } from "react-icons/md";

export default function AdminSidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const staffState = useAppSelector((state) => state.differenceSlice.staff);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <aside
      className={`${staffState.openSidebar === false ? "w-72" : "w-0"
        } bg-gray-900 text-white h-screen transition-all`}
    >
      <div className="p-4 ml-4 w-full">
        <ul className="space-y-1">
          <li className="pt-4 text-sm font-semibold text-gray-400">
            ADMIN
          </li>
          <li>
            <button
              onClick={() => toggleDropdown("dashboard")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded-md"
            >
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2 hover:bg-gray-700 rounded-md"
              >
                <RiHome2Line className="text-xl" />
                <span>Dashboard</span>
              </Link>
              <BsChevronDown
                className={`transform transition-transform ${openDropdown === "dashboard" ? "rotate-180" : ""
                  } text-gray-400`}
              />
            </button>
            {openDropdown === "dashboard" && (
              <ul className="pl-4 mt-1 space-y-1">
                <li>
                  <Link
                    href="/admin/user-donate"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <BsCoin className="text-lg" />
                    All users donation
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/admin/manage-products"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
            >
              <MdInventory className="text-lg" />
              <span>Manage Products</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/manageuser"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
            >
              <BsPerson className="text-lg" />
              <span>Manage Users</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
