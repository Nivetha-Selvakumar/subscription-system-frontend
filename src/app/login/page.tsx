"use client";

import React, { useEffect } from 'react';
import Login from '../../components/login';

const Page = () => {
  useEffect(() => {
    document.title = "Subscription | Log in";
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}

export default Page;