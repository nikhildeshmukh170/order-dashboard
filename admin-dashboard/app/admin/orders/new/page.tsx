import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderForm from "@/components/admin/forms/OrderForm";
// import BookForm from "@/components/admin/forms/BookForm";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/orders">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        {/* <BookForm /> */}
        Create a New Order
        <OrderForm />
      </section>
    </>
  );
};
export default Page;