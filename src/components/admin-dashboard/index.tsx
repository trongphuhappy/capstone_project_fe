"use client";

import useGetDashboard from '@/hooks/use-get-dashboard';
import React, { useEffect, useState } from 'react'

interface AdminDashboardProps {
    onDataFetched: (data: any) => void; 
}

export default function AdminDashboard({ onDataFetched }: AdminDashboardProps) {
    const { getDashboardApi, isPending } = useGetDashboard();
    const [dashboardData, setDashboardData] = useState<API.TDashboardData | null>(null);

    useEffect(() => {
        if (dashboardData === null) {
            const fetchDashboardData = async () => {
                const res = await getDashboardApi({ year: new Date().getFullYear() });
                if (res) {
                    setDashboardData(res.value.data);
                    onDataFetched(res.value.data);
                }
            };
            fetchDashboardData();
        }
    }, [getDashboardApi]);

    return (
        <div className="grid grid-cols-2 gap-4 bg-white">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6 text-white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total Users
                    </p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {dashboardData?.totalUsers || "N/A"}
                    </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">+3%</strong>&nbsp;than last month
                    </p>
                </div>
            </div>

            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6 text-white"
                    >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                    </svg>
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Revenue</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {dashboardData?.totalRevenue.toLocaleString() || "N/A"}
                    </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">+5%</strong>&nbsp;than yesterday
                    </p>
                </div>
            </div>
        </div>
    )
}
