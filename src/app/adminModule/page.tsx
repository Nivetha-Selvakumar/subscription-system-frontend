"use client";

import React, { useEffect } from 'react';
import Sidebar from '../../components/layout/sideBar';
import AdminDashboard from '../../components/adminModule';

const Page = () => {
  useEffect(() => {
    document.title = "Subscription | AdminDashboard";
  }, []);

  return (
    <div>
      <Sidebar>
        <AdminDashboard />
      </Sidebar>
    </div>
  );
}

export default Page;