"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { orderSchema } from "@/lib/validations";
import { Order } from "@/types";

interface Props extends Partial<Order> {
  type?: "create" | "update";
}

const OrderForm = ({ type = "create", ...order }: Props) => {
  const router = useRouter();

  // Initialize the form with default values
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      id: order.id || "",
      customer_name: order.customer_name || "",
      customer_email: order.customer_email || "",
      product: order.product || "",
      quantity: order.quantity || 1,
      order_value: order.order_value || 0,
    },
  });

  // Product price mapping
  const productPrices = {
    "Product 1": 29,
    "Product 2": 49,
    "Product 3": 149,
  };

  // Helper to calculate order value
  const calculateOrderValue = (quantity: number, product: string) => {
    return quantity * (productPrices[product] || 0);
  };

  // Form submission handler
  const onSubmit: SubmitHandler<z.infer<typeof orderSchema>> = async (values) => {
    console.log("Form submitted with values:", values); // Debugging log
    try {
      if (type === "update") {
        console.log("Updating order:", values);
      } else {
        console.log("Creating new order:", values);
      }
      toast({ description: `Order ${type} successful!` }); // Success toast
  
      // Attempt navigation
      console.log("Navigating to /orders...");
      router.push("/orders");
      console.log("Navigation triggered.");
    } catch (error) {
      console.error("Error occurred:", error); // Debugging log for errors
      toast({ description: "Something went wrong!", variant: "destructive" });
    }
  };
  

  // Render the form
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          console.log("Submit event triggered"); // Debugging log
          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        {/* Customer Name */}
        <FormField
          control={form.control}
          name="customer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input required type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Customer Email */}
        <FormField
          control={form.control}
          name="customer_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Email</FormLabel>
              <FormControl>
                <Input required type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Selection */}
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    form.setValue("product", value);
                    const quantity = form.getValues("quantity");
                    form.setValue(
                      "order_value",
                      calculateOrderValue(quantity, value)
                    );
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(productPrices).map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value, 10) || 1;
                    form.setValue("quantity", quantity);
                    const product = form.getValues("product");
                    form.setValue(
                      "order_value",
                      calculateOrderValue(quantity, product)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Order Value */}
        <FormField
          control={form.control}
          name="order_value"
          render={() => (
            <FormItem>
              <FormLabel>Order Value</FormLabel>
              <FormControl>
                <div className="text-gray-800 font-bold">
                  ₹{form.watch("order_value")}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">
          {type === "update" ? "Update Order" : "Create Order"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
