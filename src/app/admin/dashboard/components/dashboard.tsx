'use client';
import React, { useEffect, useState } from 'react';
import AdminDashboard from '@/components/admin-dashboard';

export default function Admin() {
    return (
        <div className="flex flex-col">
            <AdminDashboard />
        </div>
    );
}
