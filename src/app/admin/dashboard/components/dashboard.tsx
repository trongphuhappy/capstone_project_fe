'use client';
import React, { useEffect, useState } from 'react';
import AdminDashboard from '@/components/admin-dashboard';
import ChartOne from '@/components/chart/ChartOne';

export default function Admin() {
    const [dashboardData, setDashboardData] = useState<any>(null);

    const handleDataFetched = (data: any) => {
        setDashboardData(data);
    };

    return (
        <div className="flex flex-col">
            <div className="w-full">
                <AdminDashboard onDataFetched={handleDataFetched} />
            </div>

            <div className="grid grid-cols-12 mt-6">
                <div className="col-span-8">
                    <ChartOne data={dashboardData} />
                </div>
                {/* <div className="col-span-6">
                </div> */}
            </div>
        </div>
    );
}
