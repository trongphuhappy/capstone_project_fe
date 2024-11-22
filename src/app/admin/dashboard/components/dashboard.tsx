'use client';
import React, { useEffect, useState } from 'react';
import AdminDashboard from '@/components/admin-dashboard';
import ChartOne from '@/components/chart/ChartOne';

export default function Admin() {
    return (
        <div className="flex flex-col">
            <div className="w-full">
                <AdminDashboard />
            </div>

            <div className="grid grid-cols-12 mt-6">
                <div className="col-span-8">
                    <ChartOne />
                </div>
                {/* <div className="col-span-6">
                </div> */}
            </div>
        </div>
    );
}
