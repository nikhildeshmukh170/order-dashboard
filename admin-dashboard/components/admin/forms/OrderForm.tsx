"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
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
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { orderSchema } from "@/lib/validations";
import { Order } from "@/types";

interface Props extends Partial<Order> {
  type?: "create" | "update";
}

const OrderForm = ({ type, ...order }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      id: order.id || "",
      customer_name: order.customer_name || "",
      customer_email: order.customer_email || "",
      product: order.product || "",
      quantity: order.quantity || "",
      order_value: order.order_value || "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof orderSchema>> = async (
    values
  ) => {
    try {
      if (type === "update") {
        // Logic for updating the order
        console.log("Updating order:", values);
      } else {
        // Logic for creating a new order
        console.log("Creating new order:", values);
      }
      toast({ description: `Order ${type} successful!` });
      router.push("/orders");
    } catch (error) {
      toast({ description: "Something went wrong!", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {Object.keys(orderSchema.shape).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<z.infer<typeof orderSchema>>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {field.name.replace("_", " ")}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    {...field}
                    className="form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="form-btn">
          {type === "update" ? "Update Order" : "Create Order"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
