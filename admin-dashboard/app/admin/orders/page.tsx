import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrdersTable from "@/components/admin/OrdersTable";

const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Orders</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/orders/new" className="text-white">
            + Create a New Order
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        {/* <p>Table</p> */}
        <OrdersTable />
      </div>
    </section>
  );
};

export default Page;