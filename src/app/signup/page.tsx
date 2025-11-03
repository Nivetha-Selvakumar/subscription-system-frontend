"use client";

import React, { useEffect } from 'react';
import Signup from '../../components/signup';

const Page = () => {
  useEffect(() => {
    document.title = "Subscription | Sign up";
  }, []);

  return (
    <div>
      <Signup />
    </div>
  );
}

export default Page;