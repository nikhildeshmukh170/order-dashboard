"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  const handleBackToOrders = () => {
    router.push("/admin/orders"); // Redirect to orders page
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-50">
      <h1 className="text-green-700 font-extrabold text-3xl mb-4">
        Your order has been created successfully!
      </h1>
      <p className="text-green-600 text-lg mb-6">
        Thank you for your order. You can manage your orders or create a new one from the Orders page.
      </p>
      <button
        onClick={handleBackToOrders}
        className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
      >
        Back to Orders
      </button>
    </div>
  );
};

export default Page;
