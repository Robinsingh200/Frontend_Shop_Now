import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/app";

export const UserOrder = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/shop-products/card-shop/latest`
        );
        setOrder(res.data.order);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatestOrder();
  }, []);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-600">
        ✅ Order Confirmed
      </h1>

      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="text-green-600">
          {order.paymentStatus}
        </span>
      </p>

      <hr className="my-4" />
      <h2 className="text-xl font-semibold mb-3">Products</h2>

      {order.products.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 items-center border-b py-3"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md border"
          />
          <div className="flex-1">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity}
            </p>
            <p className="text-sm">₹{item.price}</p>
          </div>
          <p className="font-medium">
            ₹{item.price * item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
};
